<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name' ,
        'email' ,
        'phone' ,
        'whatsapp' ,
        'is_vendor' ,
        'store_title' ,
        'store_title_slug' ,
        'money' ,
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    // tables relationship

    public function coupon () {
        return $this->hasMany(Coupon::class , 'user_id' , 'id');
    }

    public function complain () {
        return $this->hasMany(Complain::class , 'user_id' , 'id');
    }

    public function product () {
        return $this->hasMany(Product::class , 'user_id' , 'id');
    }

    public function block () {
        return $this->hasMany(Block::class , 'user_id' , 'id');
    }

    public function contact () {
        return $this->hasMany(Contact::class , 'user_id' , 'id');
    }

    public function favorite () {
        return $this->belongsToMany(Product::class , 'favorite' , 'user_id' , 'product_id')->as('favorite')->withTimestamps();
    }

    public function stars() {
        return $this->belongsToMany(Product::class , 'user_stars' , 'user_id' , 'product_id')->as('user_stars')->withTimestamps()->withPivot('stars');
    }
}
