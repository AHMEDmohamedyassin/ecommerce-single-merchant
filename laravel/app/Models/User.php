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
        'slug' ,
        'name' ,
        'email' ,
        'phone' ,
        'customer' ,
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

    // relations

    public function address () {
        return $this->hasMany(Address::class , 'user_id' , 'id');
    }

    public function coupon () {
        return $this->hasMany(Coupon::class , 'user_id' , 'id');
    }

    public function order () {
        return $this->hasMany(Order::class , 'user_id' , 'id');
    }

    public function review () {
        return $this->hasMany(Review::class , 'user_id' , 'id');
    }

    public function contact () {
        return $this->hasMany(Contact::class , 'user_id' , 'id');
    }

    public function block () {
        return $this->hasMany(Block::class , 'user_id' , 'id');
    }

    public function role () {
        return $this->belongsToMany(Role::class , 'user_role' , 'user_id' , 'role_id');
    }

    public function permission () {
        return $this->belongsToMany(Permission::class , 'user_permission' , 'user_id' , 'permission_id');
    }

    public function favorite () {
        return $this->belongsToMany(Collection::class , 'favorites' , 'user_id' , 'collection_id')->withPivot('id' , 'updated_at');
    }

    public function cart () {
        return $this->belongsToMany(Product::class , 'carts' , 'user_id' , 'product_id')->withPivot('id' , 'quantity' , 'created_at' , 'updated_at');
    }

    public function transaction () {
        return $this->hasMany(Transaction::class , 'user_id' , 'id');
    }

}
