<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title><?php echo e(env('APP_NAME')); ?> ,  التحقق من البريد الإليكتروني</title>
</head>
<body>
    <div class="flex flex-col items-center w-full">

        <h1 class="text-gray-400">التحقق من البريد الإليكتروني</h1>

        <a href="<?php echo e(env('APP_URL')); ?>" class="text-[#c29958] my-10 text-3xl font-bold"><?php echo e(env('APP_NAME')); ?></a>

        <div class="flex gap-2"><span class="font-bold text-[#c29958]"><?php echo e($user?->name); ?></span><span>أهلا بك يا</span></div>

        <span class="material-symbols-outlined text-[200px] text-[#c29958]/50">mark_email_read</span>

        <p class="font-bold">تم التحقق من البريد الإلكتروني</p>

        <a href="<?php echo e(env('APP_URL') . '/dashboard'); ?>" class="bg-[#c29958] py-2 px-4 text-lg font-bold rounded-lg my-10">الذهاب للوحة التحكم الخاصة بك</a>

        <a href="<?php echo e(env('APP_URL')); ?>" class="text-lg font-bold rounded-lg my-10">الذهاب للصفحة الرئيسية</a>
    </div>
</body>
</html>
<?php /**PATH C:\Users\Ahmed\Desktop\ecommerce\laravel\resources\views/EmailVerify/Success.blade.php ENDPATH**/ ?>