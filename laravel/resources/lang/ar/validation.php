<?php


return [
    'accepted'             => 'يجب قبول :attribute.',
    'active_url'           => ':attribute ليس عنوان URL صحيح.',
    'after'                => 'يجب أن يكون :attribute تاريخًا بعد :date.',
    'after_or_equal'       => 'يجب أن يكون :attribute تاريخًا بعد أو يساوي :date.',
    'alpha'                => ':attribute يجب أن يحتوي على حروف فقط.',
    'alpha_dash'           => ':attribute يجب أن يحتوي على حروف وأرقام وشرطات فقط.',
    'alpha_num'            => ':attribute يجب أن يحتوي على حروف وأرقام فقط.',
    'array'                => ':attribute يجب أن يكون مصفوفة.',
    'before'               => 'يجب أن يكون :attribute تاريخًا قبل :date.',
    'before_or_equal'      => 'يجب أن يكون :attribute تاريخًا قبل أو يساوي :date.',
    'between'              => [
        'numeric' => ':attribute يجب أن يكون بين :min و :max.',
        'file'    => ':attribute يجب أن يكون بين :min و :max كيلوبايت.',
        'string'  => ':attribute يجب أن يكون بين :min و :max حرف.',
        'array'   => ':attribute يجب أن يحتوي على بين :min و :max عناصر.',
    ],
    'boolean'              => 'حقل :attribute يجب أن يكون صحيحًا أو خطأ.',
    'confirmed'            => 'تأكيد :attribute غير متطابق.',
    'date'                 => ':attribute ليس تاريخًا صحيحًا.',
    'date_equals'          => 'يجب أن يكون :attribute تاريخًا يساوي :date.',
    'date_format'          => ':attribute لا يتطابق مع الصيغة :format.',
    'different'            => ':attribute و :other يجب أن يكونا مختلفين.',
    'digits'               => ':attribute يجب أن يكون :digits رقمًا.',
    'digits_between'       => ':attribute يجب أن يكون بين :min و :max رقمًا.',
    'dimensions'           => ':attribute يحتوي على أبعاد صورة غير صالحة.',
    'distinct'             => 'حقل :attribute يحتوي على قيمة مكررة.',
    'email'                => ':attribute يجب أن يكون عنوان بريد إلكتروني صالح.',
    'exists'               => ':attribute المحدد غير موجود.',
    'file'                 => ':attribute يجب أن يكون ملفًا.',
    'filled'               => 'حقل :attribute مطلوب.',
    'gt'                   => [
        'numeric' => ':attribute يجب أن يكون أكبر من :value.',
        'file'    => ':attribute يجب أن يكون أكبر من :value كيلوبايت.',
        'string'  => ':attribute يجب أن يكون أكبر من :value حرف.',
        'array'   => ':attribute يجب أن يحتوي على أكثر من :value عناصر.',
    ],
    'gte'                  => [
        'numeric' => ':attribute يجب أن يكون أكبر من أو يساوي :value.',
        'file'    => ':attribute يجب أن يكون أكبر من أو يساوي :value كيلوبايت.',
        'string'  => ':attribute يجب أن يكون أكبر من أو يساوي :value حرف.',
        'array'   => ':attribute يجب أن يحتوي على :value عناصر أو أكثر.',
    ],
    'image'                => ':attribute يجب أن يكون صورة.',
    'in'                   => ':attribute غير صالح.',
    'in_array'             => 'حقل :attribute غير موجود في :other.',
    'integer'              => ':attribute يجب أن يكون عددًا صحيحًا.',
    'ip'                   => ':attribute يجب أن يكون عنوان IP صالح.',
    'ipv4'                 => ':attribute يجب أن يكون عنوان IPv4 صالح.',
    'ipv6'                 => ':attribute يجب أن يكون عنوان IPv6 صالح.',
    'json'                 => ':attribute يجب أن يكون نص JSON صالح.',
    'lt'                   => [
        'numeric' => ':attribute يجب أن يكون أقل من :value.',
        'file'    => ':attribute يجب أن يكون أقل من :value كيلوبايت.',
        'string'  => ':attribute يجب أن يكون أقل من :value حرف.',
        'array'   => ':attribute يجب أن يحتوي على أقل من :value عناصر.',
    ],
    'lte'                  => [
        'numeric' => ':attribute يجب أن يكون أقل من أو يساوي :value.',
        'file'    => ':attribute يجب أن يكون أقل من أو يساوي :value كيلوبايت.',
        'string'  => ':attribute يجب أن يكون أقل من أو يساوي :value حرف.',
        'array'   => ':attribute يجب أن يحتوي على :value عناصر أو أقل.',
    ],
    'max'                  => [
        'numeric' => ':attribute لا يمكن أن يكون أكبر من :max.',
        'file'    => ':attribute لا يمكن أن يكون أكبر من :max كيلوبايت.',
        'string'  => ':attribute لا يمكن أن يكون أكثر من :max حرف.',
        'array'   => ':attribute لا يمكن أن يحتوي على أكثر من :max عناصر.',
    ],
    'mimes'                => ':attribute يجب أن يكون ملف من النوع: :values.',
    'mimetypes'            => ':attribute يجب أن يكون ملف من النوع: :values.',
    'min'                  => [
        'numeric' => ':attribute يجب أن يكون على الأقل :min.',
        'file'    => ':attribute يجب أن يكون على الأقل :min كيلوبايت.',
        'string'  => ':attribute يجب أن يكون على الأقل :min حرف.',
        'array'   => ':attribute يجب أن يحتوي على الأقل :min عناصر.',
    ],
    'not_in'               => ':attribute غير صالح.',
    'not_regex'            => 'تنسيق :attribute غير صحيح.',
    'numeric'              => ':attribute يجب أن يكون رقمًا.',
    'present'              => 'حقل :attribute يجب أن يكون موجودًا.',
    'regex'                => 'تنسيق :attribute غير صحيح.',
    'required'             => 'حقل :attribute مطلوب.',
    'required_if'          => 'حقل :attribute مطلوب عندما يكون :other هو :value.',
    'required_unless'      => 'حقل :attribute مطلوب ما لم يكن :other هو :values.',
    'required_with'        => 'حقل :attribute مطلوب عندما يكون :values موجودًا.',
    'required_with_all'    => 'حقل :attribute مطلوب عندما تكون :values موجودة.',
    'required_without'     => 'حقل :attribute مطلوب عندما لا يكون :values موجودًا.',
    'required_without_all' => 'حقل :attribute مطلوب عندما لا تكون أي من :values موجودة.',
    'same'                 => 'حقل :attribute يجب أن يتطابق مع :other.',
    'size'                 => [
        'numeric' => ':attribute يجب أن يكون :size.',
        'file'    => ':attribute يجب أن يكون :size كيلوبايت.',
        'string'  => ':attribute يجب أن يكون :size حرف.',
        'array'   => ':attribute يجب أن يحتوي على :size عناصر.',
    ],
    'string'               => ':attribute يجب أن يكون نصًا.',
    'timezone'             => ':attribute يجب أن يكون منطقة زمنية صحيحة.',
    'unique'               => ':attribute تم استخدامه بالفعل.',
    'uploaded'             => 'فشل في تحميل :attribute.',
    'url'                  => 'تنسيق :attribute غير صحيح.',
    'uuid'                 => ':attribute يجب أن يكون UUID صالح.',



    'attributes' => [
        'email' => "البريد الإليكتروني" ,
        'phone' => "رقم الهاتف" ,
        "password" => 'كلمة المرور' ,
        "password_confirmation" => 'تأكيد كلمة المرور',
        "token" => "الرمز" ,
        "id" => "الكود" ,
        "image" => "الصورة" ,
        "images" => "الصور" ,
        "user_id" => "رمز المستخدم" ,
        "permission_id" => "رمز الإذن" ,
        "role_id" => "رمز الدور" ,
    ],

];