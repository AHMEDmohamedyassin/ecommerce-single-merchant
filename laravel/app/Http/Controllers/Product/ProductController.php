<?php

namespace App\Http\Controllers\Product;

use App\Traits\ResponseTrait;
use App\Traits\PaginateTrait;
use App\Traits\EncryptionTrait;
use App\Traits\SlugTrait;
use App\Models\Product;
use App\Models\Media;
use App\Http\Controllers\Static\SettingController;
use \Carbon\Carbon;

/**
 * 2001 : create
 * 2002 : update
 * 2003 : delete media
 * 2004 : delete product
 * 2005 : republish product
 * 2006 : special product
 * 2007  : evaluateProduct
 * 2008 : user products
 * 2009 : user favorites
 * 2010 : attach/detach products to user favorites
 */
class ProductController extends ProductHelper{
    use ResponseTrait , PaginateTrait , SlugTrait , EncryptionTrait;

    public function __construct(){
        parent::__construct();
        $this->user = auth()->setToken(request('token'))->user();
    }


    /**
     * create product
     * creating product save media to public folder and to database
     * code : 2001
     */
    public function CreateProduct () {
        try{
            if(!request()->has('media'))
                throw new \Exception('product should have at least on image' , 32);

            // validate request
            $req = $this->request_validation([
                'media' => 'array|required',
            ]);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            // check allowable products number and take from user money if available
            if($this->user->product()->count() >= $this->max_products_number){
                if($this->decrypt($this->user->money) < $this->product_cost)
                    throw new \Exception('maximum products number have reached' , 13);
                $this->user->update(['money' => $this->encrypt($this->decrypt($this->user->money) - $this->product_cost) ]);
            }

            // create product
            $product = $this->user->product()->create($req + [
                'title_slug' => $this->MultiTextSlug(request('title') , request('price') , request('pref_description')) ,
                'expire_date' => \Carbon\Carbon::now()->addDays($this->publish_days)
            ]);

            // attach categories
            $the_categories = [];
            if(request()->has('categories')) $the_categories = array_map('intval', request('categories'));
            $product->category()->attach($the_categories);

            // attach tags
            $the_tags = [];
            if(request()->has('tags')) $the_tags = array_map('intval', request('tags'));
            $product->tag()->attach($the_tags);


            // storing product media
            $paths = $this->media_upload($product);
            // writing product json file
            $paths['json'] = $this->Product_json_file(request('file_str') , $product);

            $product['paths'] = $paths;

            //update products count in setting table
            (new SettingController)->UpdateSetting('products_count');

            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(2001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * update product
     * update product and json file , adding new images
     * code : 2002
     */
    public function UpdateProduct () {
        try{
            // validate request
            $req = $this->request_validation(['id' => 'required|integer|min:1']);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            $product = $this->user->product()->find(request('id'));

            // check if product exists or user own it
            if(!$product) throw new \Exception('product not found' , 8);

            // update product
            $product->update(array_merge($req , [
                'title_slug' => $this->MultiTextSlug(request('title') , request('price') , request('pref_description')) ,
            ]));

            // attach categories
            $the_categories = [];
            if(request()->has('categories')) $the_categories = array_map('intval', request('categories'));
            $product->category()->detach();
            $product->category()->attach($the_categories);

            // attach tags
            $the_tags = [];
            if(request()->has('tags')) $the_tags = array_map('intval', request('tags'));
            $product->tag()->detach();
            $product->tag()->attach($the_tags);


            // storing images
            $paths = $this->media_upload($product);
            // writing product json file
            $paths['json'] = $this->Product_json_file(request('file_str') , $product);

            $product['paths'] = $paths;

            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(2002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * delete product images
     * code 2003
     * @var id : product_id , @var image_url
     */
    public function DeleteProductMedia () {
        try{
            request()->validate([
                'id' => 'required',
                'image_url' => 'required',
            ]);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            $product = $this->user->product()->find(request('id'));

            // check if product exists or user own it
            if(!$product) throw new \Exception('product not found' , 8);

            // getting image code
            $image_code = explode('/' , request('image_url'));
            $image_code = $image_code[count($image_code) - 1];

            // delete all sizes
            $this->DeleteFile($this->files_dir_path('large_images' , request('id') ) . $image_code);
            $this->DeleteFile($this->files_dir_path('small_images' , request('id') ) . $image_code);
            $this->DeleteFile($this->files_dir_path('large_thumbnails' , request('id')) . $image_code );
            $this->DeleteFile($this->files_dir_path('small_thumbnails' , request('id')) . $image_code );

            return $this->SuccessResponse($image_code);
        }catch(\Exception $e){
            return $this->ErrorResponse(2003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 2004
     * delete product
     * @var id : product id
     */
    public function DeleteProduct () {
        try{
            request()->validate(['id' => 'required']);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            $product = $this->user->product()->find(request('id'));

            if(!$product) throw new \Exception('product not found' , 8);

            // check expiration of product
            if($product->expire_date > Carbon::now())
                throw new \Exception('can not delete or republish before '.$this->publish_days . ' days from publish date' , 12);

            // delete product from database
            $product->delete();

            // delete product directory
            $this->DeleteDir($this->files_dir_path('dir' , request('id')));

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(2004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code : 2005
     * republish product
     * republish product if product expired
     * republish product if product not expired and user have money
     * @var id : product id
     */
    public function RepublishProduct(){
        try{
            request()->validate([
                'id' => 'required',
            ]);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            // check if user owns product
            $product = $this->user->product()->find(request('id'));
            if(!$product) throw new \Exception('product not found' , 8);

            // user money
            $user_money = $this->decrypt($this->user->money);

            // check expiration of product
            if($product->expire_date > Carbon::now()){
                if($user_money < env('PRODUCT_COST'))
                    throw new \Exception('user has no enought money to republish' , 29);
                $this->user->update([
                    'money' => $this->encrypt($user_money - env('PRODUCT_COST'))
                ]);
            }

            // update product
            $product->update([
                'expire_date' => Carbon::now()->addDays($this->publish_days)
            ]);

            // get product files
            $product = $this->Product_Files($product);

            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(2005 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code : 2006
     * special product
     * if user have enough money
     * @var id : prodcut id
     */
    public function SepcialProduct(){
        try{
            request()->validate([
                'id' => 'required',
                'months' => 'required|numeric'
            ]);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            // check if user owns product
            $product = $this->user->product()->find(request('id'));
            if(!$product) throw new \Exception('product not found' , 8);

            // check user money
            $user_money = $this->decrypt($this->user->money);
            $user_money_sufficent = $user_money >= $this->special_product_cost * request('months');
            if(!$user_money_sufficent)
                throw new \Exception('user have no efficient money' , 14);

            // reduce user money
            $this->user->update([
                'money' => $this->encrypt($user_money - $this->special_product_cost * request('months'))
            ]);

            // check if product is already special to add months
            $expire_date = null;
            if($product->special_expire_date < Carbon::now())
                $expire_date = Carbon::now()->addDays($this->special_publish_days * request('months'));
            else $expire_date = Carbon::parse($product->special_expire_date)->addDays($this->special_publish_days * request('months'));

            // update product
            $product->update([
                'expire_date' => $expire_date ,
                'special_expire_date' => $expire_date ,
            ]);

            // get product files
            $product = $this->Product_Files($product);

            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(2006 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code : 2007
     * evaluate product
     * user sends the current evaluation and last evaluation
     * if user sends evaluation first time , the last evaluation will be 0
     * @var id : product id , @var evaluation : current evaluation , @var last_evaluation : last user evaluation
     */
    public function EvaluateProduct(){
        try{
            request()->validate([
                'id' => 'required' ,
                'evaluation' => 'required|numeric|max:5',
            ]);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            // check if product exits
            $product = Product::find(request('id'));
            if(!$product) throw new \Exception('product not found' , 8);

            // initiat stars count and new count
            $old_stars = $product->stars;
            $current_count = $product->stars_count;
            $new_count = $current_count + 1;
            $new_evaluation = 0 ;

            // check if user re-rating the product
            $is_evaluated = $this->user->stars()->where('product_id' , request('id'))->first();
            if($is_evaluated && $is_evaluated->user_stars) {
                $new_evaluation = (($old_stars * $current_count) - $is_evaluated->user_stars->stars ) / $current_count;
                $new_count = $current_count;
                // detaching old evaluation
                $this->user->stars()->detach(request('id'));
            }else {
                $new_evaluation = $old_stars * ($current_count / $new_count );
            }

            // attach evaluation to evaluations table
            $this->user->stars()->attach(request('id') ,[
                'stars' => request('evaluation')
            ]);

            $new_evaluation +=  (request('evaluation') / $new_count);

            // store in database
            $product->update([
                'stars' => $new_evaluation ,
                'stars_count' => $new_count ,
            ]);

            // get products files
            $product = $this->Product_Files($product);

            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(2007 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code : 2008
     * users products
     * @var page : page
     */
    public function UserProducts(){
        try{
            request()->validate(['page' => 'numeric']);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            $products = $this->user->product()->orderBy('special_expire_date' , 'desc')->orderBy('expire_date' , 'desc');

            $data = $this->paginate($products);

            // add files thumbnails to each product
            $items = [];
            foreach($data['items'] as $item){
                $item =  $this->Product_Files($item , true);
                $items[] = $item;
            }
            $data['items'] = $items;

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(2008 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code : 2009
     * users favorite product
     * gets only not expired products
     * ordering products according to favorite record
     * @var page : page
     */
    public function UserFavorites () {
        try{
            request()->validate(['page' => 'numeric']);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            $products = $this->user->favorite();
            $products = $this->unexpired_product($products);

            $products = $products->where('expire_date' , '>=' , Carbon::now())
                ->orWhere('special_expire_date' , '>=' , Carbon::now())
                ->orderByPivot('created_at' , 'desc');

            $data = $this->paginate($products);

            // add files thumbnails to each product
            $items = [];
            foreach($data['items'] as $item){
                $item =  $this->Product_Files($item , true);
                $items[] = $item;
            }
            $data['items'] = $items;

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(2009 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code 2010
     * attach and detach products to users favorites
     * attach and detach only products that not expired
     * @var id : product id
     */
    public function AddProductToFavorites(){
        try{
            request()->validate(['id' => 'numeric']);

            // // check if token valid
            // if(!$this->user) throw new \Exception('bad token' , 5);

            // check if product exits
            $product = $this->unexpired_product(new Product)->where('id' , request('id'))->first();
            if(!$product) throw new \Exception('product not found' , 8);

            if($this->user->favorite()->find(request('id')))
                $this->user->favorite()->detach(request('id'));
            else $this->user->favorite()->syncWithoutDetaching([request('id')]);

            $data['favorite_count'] = $this->user->favorite()->count();

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(2010 , $e->getCode() , $e->getMessage());
        }
    }

}
