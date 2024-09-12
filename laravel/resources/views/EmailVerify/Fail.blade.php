<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>{{env('APP_NAME')}} ,  التحقق من البريد الإليكتروني</title>
</head>
<body>
    <div class="flex flex-col items-center w-full">

        <h1 class="text-gray-400">التحقق من البريد الإليكتروني</h1>

        <a href="{{env('APP_URL')}}" class="text-[#c29958] my-10 text-3xl font-bold">{{env('APP_NAME')}}</a>

        <span class="material-symbols-outlined text-[200px] text-[#c29958]/50">exclamation</span>

        <p class="font-bold">رابط التحقق غير صحيح الرجاء إعادة طلب إرسال بريد إليكتروني من حسابك علي الموقع</p>


        <a href="{{env('APP_URL')}}" class="text-lg font-bold rounded-lg my-10 bg-[#c29958] px-4 py-2">الذهاب للصفحة الرئيسية</a>
    </div>
</body>
</html>
