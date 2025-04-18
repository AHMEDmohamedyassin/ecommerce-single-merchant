<?php

namespace App\Http\Controllers\Credit;

use App\Events\OrderReadyEvent;
use App\Exceptions\CustomException;
use App\Http\Controllers\Setting\SettingController;
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

    // constructor
    public function __construct(){
        $this->Api_key = env('FAWATERK_API_KEY'); 
        $this->Url = env('FAWATERK_URL');

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
            
            // check if payment gateway is allowed 
            if(!(new SettingController)->valueSetting('allow_paymentgateway'))
                throw new CustomException('payment gateway not allowed' , 30);

            $user = request('user');
            $cart_total = 0;
            $cart_items = [];
            $discount = 0;
            $pieces = 0;

            // searching for order
            $order = Order::with('product.collection')->with('address')->where([
                'id' => request('id') , 
                'status' => 'pending'
            ])->first();

            // check if order is available or not
            if(!$order) 
                throw new CustomException('order not found or canceled' , 13);

            // check if order have no products
            if(!count($order->product))
                throw new CustomException('order have no products' , 25);

            // check if total is greater than zero
            if($order->cart_total <= 0)
                throw new CustomException('no money pay for' , 26);


            // handeling cart items and cart total
            foreach($order->product as $product){
                $cart_total += $product->price * $product->pivot->quantity;
                $cart_items[] = [
                    "name" => $product->collection->title,
                    "quantity" => $product->pivot->quantity ,
                    "price" => $product->price
                ];

                $pieces = $pieces + $product->pivot->quantity;

                if($product->quantity < $product->pivot->quantity)
                    throw new CustomException("order quantity of products is larger than available" , 17 , ["product" => $product->collection->title]);
            }

            // calc discount and check if it is less than zero
            $discount = $cart_total - $order->cart_total;
            if($discount < 0) $discount = 0;


            // handling details
            $details = "عدد {$pieces} قطع إجمالي السعر {$cart_total}" ;
            if($discount)
                $details .= " , يوجد خصم {$discount} , الإجمالي بعد الخصم {$order->cart_total}";


            $body = [
                "cartTotal"=> $order->cart_total,
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
                // "cartItems"=> $cart_items ,
                "cartItems"=> [
                    [
                        'name' => $details , 
                        'quantity' => 1 ,
                        'price' => $order->cart_total
                    ]
                ] ,
                // "discountData" => [ 
                //     "type" => "literal" ,
                //     "value" => $discount
                // ]
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
     * @error 20003
     * show all user invoices for users
     */
    public function ListPayment(){
        try{

            $transaction = request('user')->transaction()->orderBy('id' , 'desc');

            return $this->SuccessResponse($this->paginate($transaction , request('page')));
        }catch(\Exception $e){
            return $this->ErrorResponse(code : 20003 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }

}