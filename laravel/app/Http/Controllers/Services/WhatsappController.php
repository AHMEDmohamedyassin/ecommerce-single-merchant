<?php

namespace App\Http\Controllers\Services;

use App\Http\Controllers\Controller;
use App\Traits\CurlTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class WhatsappController extends Controller
{
    use ResponseTrait , CurlTrait;

    public $num_id = 488259557710990;
    public $account_id = 488259557710990;
    public $api_key = 'EAAIMMc2TjwoBOZCIe1KAkd3XenCL6EKXQICBM93bjbi4R5LKB70QhVMWtXodeZA58T59wGUdy6JCC3XNFqXRqm63ycvZCZBivqwOVE8AnC0oZBwKYal7ZBZCwk6ZBVudKgqid4XQ9N3z6eSbSHwDIeNpbxVRdkp8PZBg99ghebyPVg97GnUJJzuE9qxcjsKgZApFlIpDORXaqsm8zd1FJeaeCuEFEBcZBEV';


    // curl -i -X POST `
    // https://graph.facebook.com/v21.0/488259557710990/messages `
    // -H 'Authorization: Bearer ' `
    // -H 'Content-Type: application/json' `
    // -d '{ \"messaging_product\": \"whatsapp\", \"to\": \"201141244031\", \"type\": \"template\", \"template\": { \"name\": \"hello_world\", \"language\": { \"code\": \"en_US\" } } }'

    /**
     * @error 23,001
     * sending whatsapp messgage
     */
    public function SendMsgWhatsapp () {
        try{
            $url = 'https://graph.facebook.com/v21.0/' . $this->num_id . '/messages';

            $header = [
                'Content-Type: application/json',
                'Authorization: Bearer '.$this->api_key,
            ];

            $body = [
                "messaging_product" => "whatsapp" ,
                "to" => "201141244031" , 
                "type" => "template" ,
                "template" => [
                    "language" => [
                        "code" => "en_US"
                    ],
                    "name" => "hello_world"
                ]
            ];

            $req = $this->Crul_Request($url , $header , $body);

            if(!$req['success']) throw new \Exception($req['error']);

            $res = $req['res'];

            if($res->status !== 'success') throw new \Exception(json_encode($res));

            return $this->SuccessResponse($req);
        }catch(\Exception $e){
            return $this->ErrorResponse(23001 , $e->getCode() , $e->getMessage());
        }
    }
}
