<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Collection extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        "slug" ,
        "serial" ,
        "title" ,
        "description" ,
        "ratting" ,
        "views" ,
        "reviews" ,
        "publish_date" ,
        "average_price" ,
    ];

    // relations

    public function product () {
        return $this->hasMany(Product::class  , 'collection_id' , 'id');
    }

    public function category () {
        return $this->belongsToMany(Category::class , 'product_category' , 'collection_id' , 'category_id');
    }

    public function review () {
        return $this->hasMany(Review::class , 'collection_id' , 'id');
    }

    public function favorite () {
        return $this->belongsToMany(User::class , 'favorites' , 'collection_id' , 'user_id');
    }
}
