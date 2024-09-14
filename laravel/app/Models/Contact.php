<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        "name" ,
        "email" ,
        "phone" ,
        "msg" ,
        "user_id" ,
    ];



    // relations 

    public function user () {
        return $this->belongsTo(User::class , 'user_id' ,'id');
    }
}
