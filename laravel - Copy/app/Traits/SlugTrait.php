<?php

namespace App\Traits;


trait SlugTrait{

    public function CreateSlug($text) {
        $text = str_replace(["أ","ء","آ","إ"] , "ا" , $text);
        $text = str_replace(["ئ" , "ى"] , "ي" , $text);
        $text = str_replace(["ؤ"] , "و" , $text);
        $text = str_replace(["ة"] , "ه" , $text);
        $text = str_replace(["   "] , "-" , $text);
        $text = str_replace(["  "] , "-" , $text);
        $text = str_replace([" "] , "-" , $text);
        $text = str_replace([" , " , ","] , "-" , $text);
        $text = str_replace(["---" , "--"] , "-" , $text);

        return strtolower($text);
    }

    public function MultiTextSlug(...$text){
        $slug = implode(' ' , $text);
        $slug = $this->CreateSlug($slug);
        if(mb_strlen($slug , 'UTF-8') > 255) $slug = mb_substr($slug , 0 , 255 , 'UTF-8');

        return $slug;
    }

}

// أ,ء,آ , إ -> ا
// ى,ئ -> ي
// ؤ -> و
// " " -> ""
// ة -> ه
