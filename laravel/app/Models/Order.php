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
        "cartTotal" ,
        "invoice_status" ,
        "payment_method" ,
        "gateway_name" ,
        "paid_at" ,
        "invoice_id" ,
        "invoice_key" ,
        "currency" ,
        "payment_reason" ,
        "referenceNumber" ,
        "hashKey" ,
        "pay_load" ,
    ];

    
    // relations 

    public function user () {
        return $this->belongsTo(User::class , 'user_id' ,'id');
    }

    public function product () {
        return $this->belongsToMany(Product::class , 'product_order' , 'product_id' , 'order_id');
    }

    public function address () {
        return $this->belongsTo(Address::class , 'shipping_address_id' , 'id');
    }

    public function store_address () {
        return $this->belongsTo(StoreAddress::class , 'billing_address_id' , 'id');
    }
}
