<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug" ,
        "comment" ,
        "public" ,
        "ratting" ,
        "user_id" ,
        "collection_id" ,
    ];


    
    // relations 

    public function user () {
        return $this->belongsTo(User::class , 'user_id' ,'id');
    }

    public function collection () {
        return $this->belongsTo(Collection::class , 'collection_id' , 'id');
    }
}
