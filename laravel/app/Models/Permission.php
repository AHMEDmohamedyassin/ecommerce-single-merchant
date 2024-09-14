<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        "title" ,
        "slug" ,
        "description" ,
    ];
    

    // relations

    public function user () {
        return $this->belongsToMany(User::class , 'user_permission' , 'user_id' , 'permission_id');
    }

    public function role () {
        return $this->belongsToMany(Role::class , 'role_permission' , 'role_id' , 'permission_id');
    }
}
