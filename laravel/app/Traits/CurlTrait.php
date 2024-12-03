<?php


namespace App\Traits;

/**
 * trait used to fetching api using curl 
 * @return array [ state: Boolean , res/error: json ]
 * params: @var String url , @var array header , @var array body
 */

Trait CurlTrait{

    public function Crul_Request($url , $header = [] , $body = []){
        try{
            $header = [
                'Content-Type: application/json',
                ...$header , 
            ];
            
            $curl = curl_init();
    
            curl_setopt_array($curl , [
                CURLOPT_URL => $url,
                CURLOPT_POSTFIELDS => json_encode($body) ,
                CURLOPT_HTTPHEADER => $header ,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => 1,
            ]);
    
            $response = curl_exec($curl);
    
            if(curl_errno($curl)){
                return ['success' => false , 'error' => curl_error($curl) ];
            }
    
            curl_close($curl);
    
            if($response){
                // removing html from text before deocding
                if(str_contains( $response, '<!DOCTYPE html>' ))
                    $response = substr($response, 0, strpos($response, '<!DOCTYPE html>'));
                
                return ['success' => true , 'res' => json_decode($response) , 'theres' => $response];
            }else
                return ['success' => false , 'error' => 'no response'];

        }catch(\Exception $e){
            return ['success' => false , 'error' => $e->getMessage()];
        }
    }
}