<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        "address" ,
        "primary" ,
    ];

    // relations 

    public function order () {
        return $this->hasMany(Order::class , 'billing_address_id' , 'id');
    }
}
