<?php

namespace App\Http\Controllers\Permissions;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    use ResponseTrait;
    

    /**
     * @code 4001
     * Attach and detach permissions from user
     * @Admin
     */
    public function AttachUserPermission () {
        try{
            request()->validate([
                'user_id' => 'required|exists:users,id' ,
                'permission_id' => 'nullable|array' ,
                'permission_id.*' => 'numeric|exists:permissions,id'
            ]);

            // get user
            $user = User::find(request('user_id'));
            
            // sync permissions
            $user->permission()->sync(request('permission_id'));

            // get user permissions
            $user_permissions = $user->permission;

            return $this->SuccessResponse($user_permissions);
        }catch(\Exception $e){
            return $this->ErrorResponse(4001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 4002
     * listing permissions with related roles
     * @Admin
     */
    public function ListPermission () {
        try{

            $permissions = Permission::orderby('id' , 'desc')->get();

            return $this->SuccessResponse($permissions);
        }catch(\Exception $e){
            return $this->ErrorResponse(4002 , $e->getCode() , $e->getMessage());
        }
    }


}
