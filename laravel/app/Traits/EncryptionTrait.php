<?php

namespace App\Traits;

Trait EncryptionTrait{

    public function encrypt($string){
        $cipher = "aes-256-cbc";
        $iv = base64_decode(env('ENCRYPTION_IV'));
        $encrypted = openssl_encrypt($string, $cipher, base64_decode(env('ENCRYPTION_KEY')), OPENSSL_RAW_DATA , $iv);
        $encryptedBase64 = base64_encode($encrypted);
        return $encryptedBase64;
    }

    public function decrypt ($string){
        $cipher = "aes-256-cbc";
        $encrypted = base64_decode($string);
        $iv = base64_decode(env('ENCRYPTION_IV'));
        $decrypted = openssl_decrypt($encrypted, $cipher, base64_decode(env('ENCRYPTION_KEY')), OPENSSL_RAW_DATA , $iv);
        return $decrypted;
    }
}
