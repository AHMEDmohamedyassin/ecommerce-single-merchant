<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        "collection_id" ,
        "size" ,
        "color" ,
        "price" ,
        "old_price" ,
        "quantity" ,
        "paid_quantity" ,
    ] ;


    public function collection () {
        return $this->belongsTo(Collection::class , 'collection_id' , 'id');
    }

    public function order () {
        return $this->belongsToMany(Order::class , 'product_order' , 'product_id' , 'order_id')->withPivot('id' , 'quantity');
    }

    public function cart () {
        return $this->belongsToMany(User::class , 'carts' , 'product_id' , 'user_id');
    }
}
