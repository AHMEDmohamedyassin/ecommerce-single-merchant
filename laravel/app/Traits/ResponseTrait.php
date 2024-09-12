<?php

namespace App\Traits;


trait ResponseTrait{

    public function SuccessResponse($data = [] , $msg = 'good request'){
        $res['state'] = 'success';
        $res['status'] = 200;
        $res['success'] = true;
        $res['msg'] = $msg;
        $res['response'] = $data;
        return response()->json($res  , 200);
    }

    public function ErrorResponse($code = 0 , $msg_code = 0 , $msg = 'bad request' , $status = '404'){
        $res['state'] = 'fail';
        $res['status'] = $status;
        $res['success'] = false;
        $res['msg'] = $msg;
        $res['error_code'] = $code;
        $res['msg_code'] = $msg_code;
        return response()->json($res);
    }
}