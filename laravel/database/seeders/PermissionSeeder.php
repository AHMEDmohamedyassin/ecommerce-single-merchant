<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('permissions')->insert([
            ["title" => "" , "slug" => "top_category_create"] ,
            ["title" => "" , "slug" => "top_category_append"] ,
            ["title" => "" , "slug" => "top_category_delete"] ,
            ["title" => "إنشاء فئة" , "slug" => "category_create"] ,
            ["title" => "تعديل فئة" , "slug" => "category_update"] ,
            ["title" => "حذف صورة الفئة" , "slug" => "category_delete_image"] ,
            ["title" => "حذف الفئة" , "slug" => "category_delete"] ,
            ["title" => "إضافة صلاحية للمستخدمين" , "slug" => "permission_attach_user"] ,
            ["title" => "قائمة الصلاحيات" , "slug" => "permission_list"] ,
            ["title" => "إنشاء الدور" , "slug" => "role_create"] ,
            ["title" => " حذف الدور" , "slug" => "role_delete"] ,
            ["title" => " تعديل الدور" , "slug" => "role_update"] ,
            ["title" => " قائمة الأدوار" , "slug" => "role_list"] ,
            ["title" => " مشاهدة الدور" , "slug" => "role_read"] ,
            ["title" => "إضافة دور للمستخدمين" , "slug" => "role_attach_user"] ,
            ["title" => "إنشاء منتج" , "slug" => "product_create"] ,
            ["title" => "تعديل منتج" , "slug" => "product_update"] ,
            ["title" => "حذف منتج" , "slug" => "product_delete"] ,
            ["title" => "بحث عن المنتج باستخدام الرمز" , "slug" => "product_serial"] ,
            ["title" => "رفع صورة منتج" , "slug" => "product_image_upload"] ,
            ["title" => "حذف صورة منتج" , "slug" => "product_image_delete"] ,
            ["title" => "قائمة المراجعات" , "slug" => "review_list"] ,
            ["title" => "نشر المراجعات" , "slug" => "review_publish"] ,
            ["title" => "حذف المراجعات" , "slug" => "review_delete"] ,
            ["title" => "إنشاء قسيمة" , "slug" => "coupon_create"] ,
            ["title" => "حذف قسيمة" , "slug" => "coupon_delete"] ,
            ["title" => "تعديل حالة بيع القسيمة" , "slug" => "coupon_paid_status"] ,
            ["title" => "قراءة القسيمة" , "slug" => "coupon_read"] ,
            ["title" => "قائمة القسائم" , "slug" => "coupon_list"] ,
            ["title" => "إنشاء طلب" , "slug" => "order_create"] ,
            ["title" => "تعديل حالة الطلب" , "slug" => "order_update_status"] ,
            ["title" => "قراءة الطلب" , "slug" => "order_read"] ,
            ["title" => "قائمة الطلبات" , "slug" => "order_list"] ,
            ["title" => "قائمة التواصل" , "slug" => "contact_list"] ,
            ["title" => "حظر مستخدم" , "slug" => "block_create"] ,
            ["title" => "إزالة الحظر من المستخدم" , "slug" => "block_disable"] ,
            ["title" => "إزالة جميع الحظر من المستخدم" , "slug" => "block_user_disable"] ,
            ["title" => "قائمة الحظر" , "slug" => "block_list"] ,
            ["title" => "إنشاء مستخدم" , "slug" => "user_create"] ,
            ["title" => "تعديل بيانات المستخدم" , "slug" => "user_update"] ,
            ["title" => "إعادة تهيئة كلمة مرور المستخدم" , "slug" => "user_reset_password"] ,
            ["title" => "حذف المستخدم" , "slug" => "user_delete"] ,
            ["title" => "قائمة المستخدمون" , "slug" => "user_list"] ,
            ["title" => "قراءة بيانات المستخدم" , "slug" => "user_read"] ,
            ["title" => "تفاصيل بيانات المستخدم" , "slug" => "user_detail"] ,
            ["title" => "إضافة عنوان  للمستخدم" , "slug" => "user_add_address"] ,
            ["title" => "حذف عنوان المستخدم" , "slug" => "user_delete_address"] ,
            ["title" => "تعديلل عنوان المستخدم" , "slug" => "user_update_address"] ,
            ["title" => "إنشاء فرع" , "slug" => "store_create"] ,
            ["title" => "تعديل بيانات الفرع" , "slug" => "store_update"] ,
            ["title" => "حذف الفرع" , "slug" => "store_delete"] ,            
            ["title" => "إنشاء محتوي صفحات البيانات" , "slug" => "static_create"] ,            
        ]);
    }
}
