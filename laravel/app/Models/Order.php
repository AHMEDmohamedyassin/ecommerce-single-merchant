<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id" , 
        "shipping_address_id" , 
        "billing_address_id" , 
        "cart_total" , 
        "currency" , 
        "pay_on_diliver" , 
        "status" , 
    ];

    
    // relations 

    public function user () {
        return $this->belongsTo(User::class , 'user_id' ,'id');
    }

    public function product () {
        return $this->belongsToMany(Product::class , 'product_order' , 'order_id' , 'product_id')->withPivot('id' , 'quantity');
    }

    public function address () {
        return $this->belongsTo(Address::class , 'shipping_address_id' , 'id');
    }

    public function store_address () {
        return $this->belongsTo(StoreAddress::class , 'billing_address_id' , 'id');
    }

    public function transaction () {
        return $this->hasMany(Transaction::class , 'order_id' , 'id');
    }
}
