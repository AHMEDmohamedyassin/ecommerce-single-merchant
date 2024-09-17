<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        "coupon_encrypt",
        "coupon_hash",
        "value" ,
        "paid" ,
        "expire_date" ,
        "user_id" ,
    ];

    
    // relations 

    public function user () {
        return $this->belongsTo(User::class , 'user_id' ,'id');
    }
}
