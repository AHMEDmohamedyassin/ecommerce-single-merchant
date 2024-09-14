<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug" ,
        "title" ,
        "description" ,
        "price" ,
        "old_price" ,
        "quantity",
        "ratting" ,
        "views" ,
        "reviews" ,
        "paid_quantity" ,
        "expire_date" ,
        "publish_date" ,
    ] ;

    // relations

    public function category () {
        return $this->belongsToMany(Category::class , 'product_category' , 'category_id' , 'product_id');
    }

    public function order () {
        return $this->belongsToMany(Order::class , 'product_order' , 'order_id' , 'product_id');
    }

    public function review () {
        return $this->hasMany(Review::class , 'product_id' , 'id');
    }


    public function favorite () {
        return $this->belongsToMany(User::class , 'favorites' , 'user_id' , 'product_id');
    }

    public function cart () {
        return $this->belongsToMany(User::class , 'carts' , 'user_id' , 'product_id');
    }
}
