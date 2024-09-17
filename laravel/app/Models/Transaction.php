<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    private $fillable = [
        "user_id" , 
        "order_id" , 
        "gateway_name" , 
        "cart_total" , 
        "invoice_status" , 
        "payment_method" , 
        "paid_at" , 
        "invoice_id" , 
        "invoice_key" , 
        "currency" ,
        "referenceNumber" ,
        "hashKey" ,
        "pay_load" 
    ];


    // relations 

    public function user () {
        return $this->belongsTo(User::class , 'user_id' , 'id');
    }

    public function order () {
        return $this->belongsTo(Order::class , 'order_id' , 'id');
    }
}
