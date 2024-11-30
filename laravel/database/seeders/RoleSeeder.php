<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ["slug" => "dashboard" , "title" => "لوحة التحكم" ],
            ["slug" => "admin" , "title" => "المسؤول" ],
            ["slug" => "category" , "title" => "الأقسام" ],
            ["slug" => "permission" , "title" => "الصلاحيات" ],
            ["slug" => "product" , "title" => "المنتجات" ],
            ["slug" => "review" , "title" => "المراجعات" ],
            ["slug" => "coupon" , "title" => "القسائم" ],
            ["slug" => "order" , "title" => "الطلبات" ],
            ["slug" => "contact" , "title" => "طلبات التواصل" ],
            ["slug" => "block" , "title" => "الحظر" ], 
            ["slug" => "user" , "title" => "المستخدمون" ], 
            ["slug" => "store" , "title" => "الفروع" ],
        ]);
    }
}