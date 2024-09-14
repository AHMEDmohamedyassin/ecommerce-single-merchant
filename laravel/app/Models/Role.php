<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        "title" ,
        "slug" ,
        "description" ,
    ];


    // relations

    public function user () {
        return $this->belongsToMany(User::class , 'user_role' , 'user_id' , 'role_id');
    }

    public function permission () {
        return $this->belongsToMany(Role::class , 'role_permission' , 'permission_id' , 'role_id');
    }
}
