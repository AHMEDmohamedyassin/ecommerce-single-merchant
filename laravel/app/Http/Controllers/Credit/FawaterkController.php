<?php

namespace App\Http\Controllers\Credit;

use App\Models\Transaction;
use App\Models\User;
use App\Traits\CurlTrait;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Carbon\Carbon;

/**
 * the class Automatically if the env('APP_DEBUG') == true ,
 * the all redirection url will be with domain http://localhost:8000 ,
 * if the env('APP_DEBUG') == false , the all  redirection url will be on domain env('APP_URL')
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
        $this->Api_key = env('FAWATERK_API_KEY');
        $this->Url = env('FAWATERK_PAYMENT_URL');

        $domain = env('APP_URL');

        if(env('APP_DEBUG')) $domain = 'http://localhost:8000';

        $this->SuccessUrl = $domain . $this->SuccessUrl;
        $this->FailUrl = $domain . $this->FailUrl;
        $this->PendingUrl = $domain . $this->PendingUrl;
    }


    /**
     * sending payment method
     * @return url for payment , invoice_key for store in database , invoice_id for store in database
     */
    public function SendPayment(){
        try{
            request()->validate([
                'amount' => 'required' ,
                'token' => 'required' ,
                'currency' => '' ,
                'reason' => '',
            ]);

            $user = auth()->setToken(request('token'))->user();

            if(!$user) throw new \Exception('token not valid' , 2);

            $currency = request('currency')?? "EGP";
            $reason = request('reason') ?? 'إضافة رصيد إلي حسابك';

            $body = [
                "cartTotal"=> request('amount'),
                "currency"=> $currency,
                "customer"=> [
                    "first_name"=> $user->name,
                    "last_name"=> ".",
                    "email"=> $user->email,
                    "phone"=> $user->phone,
                    "address"=> ""
                ],
                "redirectionUrls"=> [
                     "successUrl"=> $this->SuccessUrl,
                     "failUrl"=> $this->FailUrl,
                     "pendingUrl"=> $this->PendingUrl
                ],
                "cartItems"=> [
                    [
                        "name"=> $reason,
                        "price"=> request('amount'),
                        "quantity"=> "1"
                    ]
                ]
            ];

            $header = [
                'Content-Type: application/json',
                'Authorization: Bearer '.$this->Api_key,
            ];


            $curl = $this->Crul_Request($this->Url , $header , $body);

            if(!$curl['success']) throw new \Exception($curl['error'] , 11);

            $res = $curl['res'];

            if($res->status !== 'success') throw new \Exception(json_encode($res) , 12);

            Transaction::create([
                'user_id' => $user->id,
                'gateway_name' => $this->gateway_name,
                'invoice_id' => $res->data->invoiceId,
                'invoice_key' => $res->data->invoiceKey,
                'currency' => $currency ,
                'cartTotal' => request('amount') ,
                'payment_reason' => $reason,
            ]);

            return $this->SuccessResponse($res->data);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:14001 ,msg: $e->getMessage() , msg_code:$e->getCode());
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
                'cartTotal' =>  request('paidAmount') ,
                'currency' => request('paidCurrency')
            ])->first();

            // update transaction state to success or fail
            $transaction->update([
                'invoice_status' => request('invoice_status'),
                'payment_method' => request('payment_method'),
                'referenceNumber' => request('referenceNumber'),
                'pay_load' => request('pay_load'),
                'paid_at' => request('paidAt'),
            ]);

            // add points to user if payment success
            $user = User::find($transaction->user_id);
            if($user && request('invoice_status') == 'paid'){
                $user->points = $user->points + (double)request('paidAmount');
                $user->save();
            }

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
            request()->validate(['token' => 'required' , 'page' => 'integer']);

            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('token not valid' , 2);
            $transaction = $user->transaction()->orderBy('created_at' , 'desc');

            return $this->SuccessResponse($this->paginate($transaction , request('page')));
        }catch(\Exception $e){
            return $this->ErrorResponse(code : 14003 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }


    /**
     * @deprecated , done in react components
     * @deprecated PaymentSuccess
     * @deprecated PaymentFail
     * @deprecated PaymentPending
     * users redirection urls methods
     */

    public function PaymentSuccess(){
        try{

            echo 'PaymentSuccess';
        }catch(\Exception $e){
            return $this->ErrorResponse(code:14004 , msg:$e->getMessage());
        }
    }


    public function PaymentFail(){
        try{

            echo 'PaymentFail';
        }catch(\Exception $e){
            return $this->ErrorResponse(code:14005 , msg:$e->getMessage());
        }
    }


    public function PaymentPending(){
        try{

            echo 'PaymentPending';
        }catch(\Exception $e){
            return $this->ErrorResponse(code:14006 , msg:$e->getMessage());
        }
    }

}
