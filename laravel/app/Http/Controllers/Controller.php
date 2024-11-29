<?php

namespace App\Http\Controllers;

use App\Models\Collection;

class Controller
{

    /**
     * product page seo optimizer
     */
    public function ProductPage($id){
        try{
            $collection = Collection::find($id);

            if(!$collection)
                throw new \Exception();
    
    
            return view('Product' , [
                'collection' => $collection,
                'image' => route('image_url') . '?type=product&width=400&id=' . $id,
                'page_url' => route('product_page' , ['id' => $id]),
                'key_words' => str_replace(' ' , ' ,' , $collection->title . ' ' . $collection->description)
            ]);
        }catch(\Exception $e){
            return abort(404);
        }
    }

}
