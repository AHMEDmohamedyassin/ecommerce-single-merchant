<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Setting\SettingController;
use App\Models\Block;
use App\Models\User;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use App\Traits\SlugTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    use ResponseTrait , PaginateTrait , SlugTrait;

    /**
     * @error 16001
     */
    public function CreateBlock()
    {
        try{
            request()->validate([
                'id' => 'required|exists:users,id' , 
                'reason' => 'nullable|max:255' , 
                'expire_days' => 'numeric|nullable|min:0'
            ]);

            $default_expire_days = (new SettingController)->valueSetting('block_expire_days');

            // get all blocks of user
            $block = User::find(request('id'))->block();

            // expire all user blocks
            $block->update([
                'expire_date' => Carbon::now()
            ]);

            // create new block with new expire date
            $block = $block->create([
                'reason' => request('reason'),
                'expire_date' => Carbon::now()->addDays(request('expire_days' , $default_expire_days))
            ]);

            return $this->SuccessResponse($block);
        }catch(\Exception $e){
            return $this->ErrorResponse(15001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 15002
     * disable block 
     * set expire date before now to remove user block
     * @var id block id
     */
    public function DisableBlock () {
        try{
            request()->validate([
                'id' => 'required|exists:blocks,id'
            ]);

            $block = Block::find(request('id'));
            
            $block->update([
                'expire_date' => Carbon::now()
            ]);
            
            return $this->SuccessResponse($block);
        }catch(\Exception $e){
            return $this->ErrorResponse(15002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 15003
     * disable user blocks
     * set expire date before now for all blocks of user
     * @var id user id
     */
    public function DisableUserBlock () {
        try{
            request()->validate([
                'id' => 'required|exists:users,id'
            ]);

            $blocks = User::find(request('id'))->block();
            
            $blocks->update([
                'expire_date' => Carbon::now()
            ]);
            
            return $this->SuccessResponse($blocks->get());
        }catch(\Exception $e){
            return $this->ErrorResponse(15003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * @error 15004
     * list blocks
     */
    public function ListBlock () {
        try{
            request()->validate([
                'orderby' => 'in:expire_date,id,created_at'
            ]);

            $blocks = Block::query();

            $blocks->orderby(request('orderby' , 'id') , 'desc');
            
            return $this->SuccessResponse($this->paginate($blocks));
        }catch(\Exception $e){
            return $this->ErrorResponse(15004 , $e->getCode() , $e->getMessage());
        }
    }

}
