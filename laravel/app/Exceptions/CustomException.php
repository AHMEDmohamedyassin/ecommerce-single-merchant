<?php

namespace App\Exceptions;

use Exception;

class CustomException extends Exception
{
    public function __construct($message = '', $code = 0)
    {
        // Fetch the translated message using the translation helper
        $translatedMessage = __('errors.' . $message, [], app()->getLocale());
        
        parent::__construct($translatedMessage, $code);
    }
}
