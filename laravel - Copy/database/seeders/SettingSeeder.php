<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('settings')->insert([
            ["slug" => "max_user_addresses" , "value" => 3 , "private" => 1 , "updatable" => 1 , "title" => "أكبر عدد من العناوين لكل مستخدم"] ,
            ["slug" => "auto_public_review" , "value" => 0 , "private" => 1 , "updatable" => 1 , "title" => "نشر تقييم المنتج بدون مراجعة"] ,
            ["slug" => "coupon_max_value" , "value" => 1000 , "private" => 1 , "updatable" => 1 , "title" => "أكبر قيمة للقسيمة"] ,
            ["slug" => "coupon_valid_days" , "value" => 30 , "private" => 1 , "updatable" => 1 , "title" => "أكبر عدد أيام صلاحية للقسيمة"] ,
            ["slug" => "block_expire_days" , "value" => 30 , "private" => 1 , "updatable" => 1 , "title" => "عدد أيام الحظر الإفتراضية"] ,
        ]);
    }
}
