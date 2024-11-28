<?php

namespace App\Exceptions;

use Exception;

class CustomException extends Exception
{
    public function __construct($message = '', $code = 0 , $params = [])
    {
        // Fetch the translated message using the translation helper
        $translatedMessage = __('errors.' . $message, $params , app()->getLocale());
        
        parent::__construct($translatedMessage, $code);
    }
}
