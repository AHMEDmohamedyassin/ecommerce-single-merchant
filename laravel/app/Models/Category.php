<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        "slug" ,
        "title" ,
        "description" ,
    ];

    // relations

    public function product () {
        return $this->belongsToMany(Collection::class , 'product_category' , 'category_id' , 'collection_id');
    }
}
