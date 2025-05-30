<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    use HasFactory;

    protected $fillable = [
        "reason" ,
        "expire_date" ,
        "user_id" ,
    ];


    
    // relations 

    public function user () {
        return $this->belongsTo(User::class , 'user_id' ,'id');
    }
}
