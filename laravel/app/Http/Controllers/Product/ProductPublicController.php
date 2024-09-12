<?php

namespace App\Http\Controllers\Product;

use App\Traits\ResponseTrait;
use App\Traits\PaginateTrait;
use App\Traits\SlugTrait;
use App\Traits\FileTrait;
use App\Models\Product;
use App\Models\User;

use \Carbon\Carbon;

/**
 * 5001 : read product
 * 5002 : search product
 * 5003 : products with ids
 */

class ProductPublicController extends ProductHelper{
    use ResponseTrait , PaginateTrait , SlugTrait , FileTrait;

    /**
     * @code 5001
     * read product
     * @var id : product id , @var token : if token is provided the expired product of user will be shown
     */
    public function ReadProduct () {
        try{
            request()->validate([
                'id' => 'numeric|required' ,
                'token' => 'nullable'
            ]);

            // check user
            $user = null;
            if(request('token'))
                $user = auth()->setToken(request('token'))->user();

            // check if product is expired
            $product = new Product();
            if($user) {
                $product = $user->product()->where('id' , request('id'))->first();
            }else{
                $product = $product->where('id' , request('id'));
                $product = $this->unexpired_product($product)->first();
            }
            if(!$product) throw new \Exception('product not found' , 8);

            $product['category'] = $product->category;
            $product['tag'] = $product->tag;
            $product['user'] = $product->user()->select('id','store_title' , 'phone' , 'whatsapp')->first();
            $product['user']['image'] = $this->FileUrl('/users/' . $product['user']->id . '/main.jpg');

            // get product files
            $product = $this->Product_Files($product);

            $product['json'] = $this->ReadContent($this->files_dir_path('json' , request('id')));
            if($product['json']) $product['json'] = json_decode($product['json']);

            if(request('token')){
                $user = auth()->setToken(request('token'))->user();
                if($user){
                    $fav = $product->favorite()->where('user_id' , $user->id)->first();
                    if($fav)
                        $product['in_fav'] = true;
                    else $product['in_fav'] = false;
                }
            }

            return $this->SuccessResponse($product);
        }catch(\Exception $e){
            return $this->ErrorResponse(5001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code : 5002
     * search product
     * @var page , @var text : search text
     * @var category_id : categories ids array to filter with categories , @var tag_id : tags ids array to filter with tags
     */
    public function SearchProduct () {
        try{
            request()->validate([
                'text' => 'max:255' ,
                'order' => 'in:ratedhigh,pricehigh,pricelow|nullable' ,
            ]);

            $product = new Product();

            // filtering products using categories and tags
            $product = $this->filter_product($product);

            // get unexpired products
            $product = $this->unexpired_product($product);

            // search for products
            $product = $product->where('title_slug' , 'LIKE' , '%'.$this->CreateSlug(request('text')).'%');

            // ordering
            if(request('order') == 'ratedhigh')
                $product = $product->select('*')->selectRaw('stars * stars_count as ratting')->orderBy('ratting' , 'desc');
            if(request('order') == 'pricehigh')
                $product = $product->orderBy('price' , 'desc');
            if(request('order') == 'pricelow')
                $product = $product->orderBy('price');


            // default ordering
            $product = $product->orderBy('special_expire_date' , 'desc')
            ->orderBy('expire_date' , 'desc')
            ->orderBy('created_at' , 'desc');

            $data = $this->paginate($product);

            // add files thumbnails to each product
            $items = [];
            foreach($data['items'] as $item){
                $item =  $this->Product_Files($item , true);
                $items[] = $item;
            }
            $data['items'] = $items;

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(5002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code : 5003
     * get products with ids list
     * @var ids : array of products ids , @var page
     * @var category_id : categories ids array to filter with categories , @var tag_id : tags ids array to filter with tags
     */
    public function WithIdsProduct(){
        try{
            request()->validate([
                'ids' => 'array|required'
            ]);

            $product = Product::whereIn('id' , request('ids'));

            // filtering products using categories and tags
            $product = $this->filter_product($product);

            // get unexpired products
            $product = $this->unexpired_product($product);


            $data = $this->paginate($product);

            // add files thumbnails to each product
            $items = [];
            foreach($data['items'] as $item){
                $item =  $this->Product_Files($item , true);
                $items[] = $item;
            }
            $data['items'] = $items;

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(5003 , $e->getCode() , $e->getMessage());
        }
    }

    /**
     * code : 5004
     * get highest rated products
     */
    public function HighestRattedProduct(){
        try{

            $product = Product::select('*')->selectRaw('stars * stars_count as ratting');

            $product = $this->unexpired_product($product);

            $product = $product->orderBy('ratting' , 'desc')
                ->orderBy('special_expire_date' , 'desc')
                ->orderBy('expire_date' , 'desc');

            $data = $this->paginate($product);

            // add files thumbnails to each product
            $items = [];
            foreach($data['items'] as $item){
                $item =  $this->Product_Files($item , true);
                $items[] = $item;
            }
            $data['items'] = $items;

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(5004 , $e->getCode() , $e->getMessage());
        }
    }




    /**
     * code : 5005
     * store products
     * @var page : page , @var id : user id (store ids)
     */
    public function StoreProducts(){
        try{
            request()->validate(['page' => 'numeric' , 'id' => 'required']);

            // check if user (store) found
            $user= User::find(request('id'));
            if(!$user) throw new \Exception('store not found' , 25);

            $product = $user->product();

            // get unexpired products
            $product = $this->unexpired_product($product);

            $product = $product->orderBy('special_expire_date' , 'desc')->orderBy('expire_date' , 'desc');

            $data = $this->paginate($product);

            // add files thumbnails to each product
            $items = [];
            foreach($data['items'] as $item){
                $item =  $this->Product_Files($item , true);
                $items[] = $item;
            }
            $data['items'] = $items;

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(5005 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * code : 5006
     * get products with categories and tags
     *
     */
    public function CatTagProducts(){
        try{
            request()->validate([
                'category' => 'array' ,
                'tag' => 'array' ,
            ]);

            $categories = request('category');
            $tags = request('tag');

            $product = new Product();

            if($categories && !$tags){
                $product = $product->whereHas('category' , function ($query) use($categories) {
                    $query->whereIn('categories.id' , $categories);
                });
            }elseif($tags && !$categories){
                $product = $product->WhereHas('tag' , function ($query) use($tags) {
                    $query->whereIn('tags.id' , $tags);
                });
            }else if($tags && $categories){
                $product = $product->where(function ($query) use($categories , $tags) {
                    $query->whereHas('category' , function ($q) use($categories){
                        $q->whereIn('categories.id' , $categories);
                    })->orWhereHas('tag' , function ($q) use($tags) {
                        $q->whereIn('tags.id' , $tags);
                    });
                });
            }


            // get unexpired products
            $product = $this->unexpired_product($product);

            $data = $this->paginate($product);

            // add files thumbnails to each product
            $items = [];
            foreach($data['items'] as $item){
                $item =  $this->Product_Files($item , true);
                $items[] = $item;
            }
            $data['items'] = $items;

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(5006 , $e->getCode() , $e->getMessage());
        }
    }

}
