<?php

namespace App\Http\Controllers\Permissions;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use App\Traits\SlugTrait;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    use ResponseTrait , SlugTrait , PaginateTrait;

    /**
     * @code 5001
     * create role and appending permissions
     * @Admin
     */
    public function CreateRole () {
        try{
            $req = request()->validate([
                'title' => 'required|string|max:255' ,
                'description' => 'nullable|max:255' ,
                'permission_id' => 'nullable|array' ,
                'permission_id.*' => 'numeric|exists:permissions,id'
            ]);

            $role = Role::create($req + [
                'slug' => $this->MultiTextSlug(request('title') , request('description'))
            ]);

            $role->permission()->sync(request('permission_id'));

            return $this->SuccessResponse($role->load('permission'));
        }catch(\Exception $e){
            return $this->ErrorResponse(5001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @code 5002
     * delete role with its permissions pivot
     * @Admin
     */
    public function DeleteRole () {
        try{
            request()->validate([
                'id' => 'required|exists:roles,id'
            ]);

            $role = Role::find(request('id'));
            $role->delete();

            return $this->SuccessResponse($role);
        }catch(\Exception $e){
            return $this->ErrorResponse(5002 , $e->getCode() , $e->getMessage());
        }
    }


    
    /**
     * @code 5003
     * update role and related permissions
     * @Admin
     */
    public function UpdateRole () {
        try{
            $req = request()->validate([
                'id' => 'required|exists:roles,id' ,
                'title' => 'string|max:255' ,
                'description' => 'nullable|max:255' ,
                'permission_id' => 'nullable|array' ,
                'permission_id.*' => 'numeric|exists:permissions,id'
            ]);

            $role = Role::find(request('id'));

            // update on role
            $role->update($req + [
                'slug' => $this->MultiTextSlug(request('title') ?? $role->title , request('description') ?? $role->description)
            ]);

            // update on related permissions
            $role->permission()->sync(request('permission_id'));

            return $this->SuccessResponse($role->load('permission'));
        }catch(\Exception $e){
            return $this->ErrorResponse(5003 , $e->getCode() , $e->getMessage());
        }
    }


    
    /**
     * @code 5004
     * list all roles
     * @Admin
     */
    public function ListRole () {
        try{
            return $this->SuccessResponse(Role::get());
        }catch(\Exception $e){
            return $this->ErrorResponse(5004 , $e->getCode() , $e->getMessage());
        }
    }


    
    /**
     * @code 5005
     * read role data and its permissions
     * @Admin
     */
    public function ReadRole () {
        try{
            request()->validate([
                "id" => "required|exists:roles,id"
            ]);

            $role = Role::find(request('id'))->load('permission');

            return $this->SuccessResponse($role);
        }catch(\Exception $e){
            return $this->ErrorResponse(5005 , $e->getCode() , $e->getMessage());
        }
    }


}
