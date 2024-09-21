<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug" ,
        "serial" ,
        "title" ,
        "description" ,
        "price" ,
        "old_price" ,
        "quantity",
        "ratting" ,
        "views" ,
        "reviews" ,
        "paid_quantity" ,
        "publish_date" ,
    ] ;

    // relations

    public function category () {
        return $this->belongsToMany(Category::class , 'product_category' , 'product_id' , 'category_id');
    }

    public function order () {
        return $this->belongsToMany(Order::class , 'product_order' , 'product_id' , 'order_id')->withPivot('id' , 'quantity');
    }

    public function review () {
        return $this->hasMany(Review::class , 'product_id' , 'id');
    }


    public function favorite () {
        return $this->belongsToMany(User::class , 'favorites' , 'product_id' , 'user_id');
    }

    public function cart () {
        return $this->belongsToMany(User::class , 'carts' , 'product_id' , 'user_id');
    }
}
