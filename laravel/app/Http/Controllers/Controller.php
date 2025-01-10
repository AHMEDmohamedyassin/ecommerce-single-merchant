<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\StoreAddress;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Controller
{

    /**
     * product page seo optimizer
     */
    public function ProductPage($id){
        try{
            $collection = Collection::find($id);

            $stores = Cache::remember('ProductPage_func' , now()->addHours(env('CACHE_SHORT_METHODS_HOURS')) , function () {
                return StoreAddress::get();
            });

            if(!$collection)
                throw new \Exception();
    
    
            return view('Product' , [
                'collection' => $collection,
                'image' => route('image_url') . '?type=product&width=400&id=' . $id,
                'page_url' => route('product_page' , ['id' => $id]),
                'key_words' => str_replace(' ' , ' ,' , $collection->title . ' ' . $collection->description),
                'stores' => $stores
            ]);
        }catch(\Exception $e){
            return abort(404);
        }
    }


    /**
     * Home
     * all pages seo optimizer 
     */
    public function HomePage(){
        try{
            $dataCached = Cache::remember('HomePage_func' , now()->addHours(env('CACHE_SHORT_METHODS_HOURS')) , function () {
                $static = [];
                $files = ["about","contact"];
                $description = "";
                $keywords = "";
                $html = "<ul>";
                $script = "{";
                $index = 0;
    
                foreach($files as $file){
                    $path = '/static/' . $file . '/json.json';
        
                    if(Storage::exists($path)){
                        $json = Storage::read($path);
            
                        $json = json_decode($json);
    
                        $static[$file] = $json;
                    }
        
                }
    
                // add about content to description 
                if($static['about'] && $static['about']->content ){
                    foreach($static['about']->content as $object){
                        if(isset($object->title) && isset($object->value)){
                            $description .= $object->title . " : " . $object->value . " , ";
                            $keywords = str_replace(' ' , ' ,' , $object->value);
                            $html .= "<li><h2>".$object->title."</h2><h3>".$object->value."</h3></li>";
                            $script .= '"about.'.$index.'":' . '"'.$object->value.'" ,';
                            $index++;
                        }
                    }
                }
    
                // add contact content to description 
                if($static['contact'] ){
                    foreach(((array) $static['contact']) as $key => $value ){
                        if(is_string($value)){
                            $description .= $key . " : " . $value . " , ";
                            $keywords .= $value . " ,";
                            $html .= "<li><h2>".$key."</h2><h3>".$value."</h3></li>";
                            $script .= '"about.'.$index.'":' . '"'.$value.'" ,';
                            $index++;
                        }
                        else if(is_object($value))
                            foreach((array)$value as $subKey => $subValue)
                                if(is_string($subValue)){
                                    $description .= $subKey . " : " . $subValue . " , ";
                                    $keywords .= $subValue . " ,";
                                    $html .= "<li><h2>".$subKey."</h2><h3>".$subValue."</h3></li>";
                                    $script .= '"about.'.$index.'":' . '"'.$subValue.'" ,';
                                    $index++;
                                }
                    }
                }

                return [
                    'static' => $static ,
                    'description' => $description,
                    'keywords' => $keywords,
                    'html' =>  $html .'</ul>' ,
                    'script' => $script . '}'
                ];
            });

            return view('Home' , $dataCached);
        }catch(\Exception $e){
            return abort(404);
        }
    }

}
