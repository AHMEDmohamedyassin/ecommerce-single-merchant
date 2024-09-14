<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
        a{
            text-decoration: none
        }
        .flex{
            display: flex
        }
        .flex-col{
            flex-direction: column
        }
        .justify-center{
            justify-content: center
        }
        .items-center{
            align-items: center
        }
        .text-gray-400{
            color: rgb(156 163 175);
        }
        .mainTextYellow{
            color : #c29958
        }
        .my-10{
            margin: 2.5rem 0
        }
        .text-3xl{
            font-size: 1.875rem; /* 30px */
            line-height: 2.25rem; /* 36px */
        }
        .font-bold{
            font-weight: 700;
        }
        .mx-2{
            margin-left: 0.5rem; /* 8px */
            margin-right: 0.5rem; /* 8px */
        }
        .mainBgYellow{
            background-color: #c29958
        }
        .py-2{
            padding-top: 0.5rem; /* 8px */
            padding-bottom: 0.5rem; /* 8px */
        }
        .px-4{
            padding-left: 1rem; /* 8px */
            padding-right: 1rem; /* 8px */
        }
        .text-lg{
            font-size: 1.25rem; /* 20px */
            line-height: 1.75rem; /* 28px */
        }
        .rounded-lg{
            border-radius: 0.5rem; /* 8px */
        }
        .gap-y-4{
            row-gap: 1rem; /* 16px */
        }
        .text-xs{
            font-size: 0.875rem; /* 14px */
            line-height: 1.25rem; /* 20px */
        }
        .text-center{
            text-align: center
        }
        .mt-20{
            margin-top: 5rem; /* 8px */
        }
        .text-gray-500{
            color: rgb(107 114 128);
        }
        .text-2xl{
            font-size: 1.5rem; /* 24px */
            line-height: 2rem; /* 32px */
        }
        .text-gray-900{
            color: rgb(24 24 27);
        }
    </style>
    <title>التحقق من البريد الإليكتروني</title>
</head>
<body class="p-10">
    <div class="flex flex-col justify-center items-center ">

        <h1 class="text-gray-400">التحقق من البريد الإليكتروني</h1>

        <a href="<?php echo e(env('APP_URL')); ?>" class="mainTextYellow my-10 text-3xl font-bold"><?php echo e(env('APP_NAME')); ?></a>

        <p class="text-lg">اهلا بك يا <span class="font-bold mainTextYellow mx-2"><?php echo e($user?->name); ?></span> , تم إرسال تلك الرسالة للتحقق من بريدك الإليكتروني</p>

        <a href="<?php echo e($url); ?>" class="mainBgYellow py-2 px-4 text-lg font-bold rounded-lg my-10 text-gray-900">اضغط هنا للتحقق</a>

        <div class="flex flex-col justify-center items-center gap-y-4">
            <span class="">أو قم بنسخ الرابط أدناه و فتحه في المتصفح</span>
            <p class="text-xs text-center"><?php echo e($url); ?></p>
        </div>

    </div>

    <div class=" mt-20">
        <a href="<?php echo e(env('APP_URL') . '/contact'); ?>" class="text-gray-500 font-bold text-lg">اضغط هنا للتواصل معنا بمختلف الطرق</a>
    </div>

    <div class="mt-20 flex justify-center">
        <a href="<?php echo e(env('APP_URL')); ?>" class="text-gray-500 font-bold text-2xl"><?php echo e(env('APP_URL')); ?></a>
    </div>
</body>
</html>
<?php /**PATH C:\Users\Ahmed\Desktop\ecommerce\laravel\resources\views/Emails/EmailVerify.blade.php ENDPATH**/ ?>