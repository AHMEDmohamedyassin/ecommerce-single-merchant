<?php

namespace App\Http\Controllers\Credit;

use App\Events\OrderReadyEvent;
use App\Exceptions\CustomException;
use App\Models\Order;
use App\Models\Transaction;
use App\Models\User;
use App\Traits\CurlTrait;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Event;

/**
 * class send payment , redirect user , has callback method
 * Error code : 14000
 */
class FawaterkController {
    use ResponseTrait , CurlTrait , PaginateTrait;

    public $Api_key;
    public $Url;
    public $gateway_name = 'fawaterk';
    // redirection urls
    public $SuccessUrl = "/payment/success";
    public $FailUrl = "/payment/fail";
    public $PendingUrl = "/payment/pending";

    public function __construct(){
        $this->Api_key = "d0227d4db6196bdb5465a50a22c773f5ba7a6c6813ac733dba";
        $this->Url = "https://staging.fawaterk.com/api/v2/createInvoiceLink";

        $domain = env('APP_URL');

        $this->SuccessUrl = $domain . $this->SuccessUrl;
        $this->FailUrl = $domain . $this->FailUrl;
        $this->PendingUrl = $domain . $this->PendingUrl;
    }


    /**
     * @error 20,001
     * sending payment method
     * @return url for payment , invoice_key for store in database , invoice_id for store in database 
     */
    public function SendPayment(){
        try{
            request()->validate([
                'id' => 'required|exists:orders,id'
            ]);

            $user = request('user');
            $order = Order::with('product')->with('address')->find(request('id'));
            $cart_total = 0;
            $cart_items = [];


            // handeling cart items and cart total
            foreach($order->product as $product){
                $cart_total += $product->price * $product->pivot->quantity;
                $cart_items[] = [
                    "name" => $product->title,
                    "quantity" => $product->pivot->quantity ,
                    "price" => $product->price
                ];

                if($product->quantity < $product->pivot->quantity)
                    throw new CustomException("order quantity of products is larger than available" , 17);
            }

            $body = [
                "cartTotal"=> $cart_total,
                "currency"=>"EGP",
                "customer"=> [
                    "first_name"=> $user->name,
                    "last_name"=> ".",
                    "email"=> $user->email ?? null,
                    "phone"=> $user->phone ?? null,
                    "address"=>  $order->address?->address ?? null
                ],
                "redirectionUrls"=> [
                     "successUrl"=> $this->SuccessUrl,
                     "failUrl"=> $this->FailUrl,
                     "pendingUrl"=> $this->PendingUrl   
                ],
                "cartItems"=> $cart_items
            ];

            $header = [
                'Content-Type: application/json',
                'Authorization: Bearer '.$this->Api_key,
            ];
            

            $curl = $this->Crul_Request($this->Url , $header , $body);

            if(!$curl['success']) throw new \Exception($curl['error'] , 9);

            $res = $curl['res'];

            if($res->status !== 'success') throw new \Exception(json_encode($res) , 10);

            Transaction::create([
                'user_id' => $user->id,
                'order_id' => $order->id,
                'gateway_name' => $this->gateway_name,
                'invoice_id' => $res->data->invoiceId,
                'invoice_key' => $res->data->invoiceKey,
                'currency' => "EGP" ,
                'cart_total' => $cart_total ,
            ]);

            return $this->SuccessResponse($res->data);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:20001 ,msg: $e->getMessage() , msg_code:$e->getCode());
        }
    }

    /**
     * the post request from fawaterk to my site 
     * to store the state of payments
     */
    public function CallbackPayment(){
        try{
            if(request('api_key') != $this->Api_key) throw new \Exception('');

            
            // get the stored transaction
            $transaction = Transaction::where([
                'invoice_id' => request('invoice_id') , 
                'invoice_key' => request('invoice_key') ,
            ])->first();

            // check if transaction is found
            if(!$transaction)
                throw new \Exception();

            // update transaction state to success or fail
            $transaction->update([
                'invoice_status' => request('invoice_status' , null),
                'payment_method' => request('payment_method' , null),
                'referenceNumber' => request('referenceNumber' , null),
                'pay_load' => request('pay_load' , null),
                'paid_at' => request('paidAt' , null),
            ]);


            // check if transaction is success
            if(request('invoice_status') != 'paid')
                throw new \Exception();


            // make order to be read , to make admin to prepare it
            Event::dispatch(new OrderReadyEvent($transaction->order));

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:14002 , msg:$e->getMessage());
        }
    }


    /**
     * show all user invoices for users
     */
    public function ListPayment(){
        try{

            $transaction = request('user')->transaction()->orderBy('id' , 'desc');

            return $this->SuccessResponse($this->paginate($transaction , request('page')));
        }catch(\Exception $e){
            return $this->ErrorResponse(code : 14003 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }

}