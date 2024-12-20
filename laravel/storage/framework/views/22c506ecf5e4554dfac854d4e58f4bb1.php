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
        .bg-gray-200 {
            background-color: #999;
        }
        .text-white{
            color : #fff
        }
        .check-button{
            margin: 30px 0px;
            background-color: #d9d9d9;
            padding: 15px 40px;
            border-radius: 5px;
            box-shadow: 1px 1px 10px -3px #333;
            border: solid 1px #999;
            color: #333;
            font-size: 20px;
            font-weight: 700;
        }
        .check-button:hover{
            box-shadow: 1px 1px 10px 1px #333;
        }
    </style>
    <title>إشعار بطلب جديد</title>
</head>
<body class="p-10">
    <div class="flex flex-col justify-center items-center ">

        <h1 class="text-gray-400">إشعار بطلب جديد</h1>

        <a href="<?php echo e(env('APP_URL')); ?>" class=" my-10 text-3xl font-bold text-gray-500"><?php echo e(env('APP_NAME')); ?></a>

        <div>

            
            <h3>بيانات المستخدم</h3>
            <div>
                <span>الاسم : </span>
                <span><?php echo e($order?->user?->name); ?></span>
            </div>
            <div>
                <span>البريد الإليكتروني : </span>
                <span><?php echo e($order?->user?->email); ?></span>
            </div>
            <div>
                <span>رقم الهاتف : </span>
                <span><?php echo e($order?->user?->phone); ?></span>
            </div>
            <div>
                <span>العنوان : </span>
                <span><?php echo e($order?->address?->address); ?></span>
            </div>
            <div>
                <span>عناوين أخري للمستخدم : </span>
                <?php if($order->user): ?>
                    <?php $__currentLoopData = $order->user?->address; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $address): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <br/><span><?php echo e($address->address); ?></span>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php endif; ?>
            </div>
            
            <hr>

            
            <h3>بيانات المنتجات</h3>
            <?php if($order->product): ?>
            <?php $__currentLoopData = $order->product; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $product): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <h4 style="margin-bottom: 0"><?php echo e($product->collection->title); ?></h4>
                <div>
                    <span>الكود : </span>
                    <span><?php echo e($product->collection->serial); ?></span>
                </div>
                <div>
                    <span>المقاس : </span>
                    <span><?php echo e($product->size); ?></span>
                </div>
                <div>
                    <span>اللون : </span>
                    <span><?php echo e($product->color); ?></span>
                </div>
                <div>
                    <span>السعر : </span>
                    <span><?php echo e($product->price); ?></span>
                </div>
                <div>
                    <span>الكمية : </span>
                    <span><?php echo e($product->pivot->quantity); ?></span>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            <?php endif; ?>
            
            <hr>

            
            <h3>بيانات الطلب</h3>
            <div>
                <span>إجمالي السعر : </span>
                <span><?php echo e($order->cart_total); ?> جم</span>
            </div>
            <div>
                <span>طريقة الدفع : </span>
                <span><?php echo e($order->pay_on_diliver ? "الدفع عند الإستلام" : "الدفع أون لاين"); ?></span>
            </div>
            <div>
                <span>حالة المنتج : </span>
                <span><?php echo e($order->status); ?></span>
            </div>
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
<?php /**PATH C:\Users\Ahmed\Desktop\ecommerce\laravel\resources\views/Emails/OrderAdminNotification.blade.php ENDPATH**/ ?>