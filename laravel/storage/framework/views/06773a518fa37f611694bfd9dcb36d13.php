<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="<?php echo e(env('APP_URL')); ?>/api/image?width=48&type=setting" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    
    <!-- description -->
    <meta name="description" content="Web site created using create-react-app" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" href="<?php echo e(env('APP_URL')); ?>/api/image?width=48&type=setting" />

    <title><?php echo e(env('APP_NAME')); ?></title>
    

    
    <?php 
      $js_dir = public_path('/dash/static/js');
      $css_dir = public_path('/dash/static/css');
      $tags = '';

      // js files
      if(is_dir($js_dir)){
        $js = null;
        $files = scandir($js_dir);
        foreach ($files as $key => $value) {
          if(preg_match("/^main.*\.js$/", $value))
            $tags = "<script defer src=". asset("/dash/static/js/{$value}") . "></script>";
        }
      }

      // css files
      if(is_dir($css_dir)){
        $css = null;
        $files = scandir($css_dir);
        foreach ($files as $key => $value) {
          if(preg_match("/^main.*\.css$/", $value))
            $tags .= "<link href=". asset('/dash/static/css/'. $value) ." rel='stylesheet'>";
        }
      }

      echo $tags;
    ?>
    
    
    
  
  </head>
  <body>
    <noscript>تحتاج إلي تشغيل الجافاسكريبت حتي يعمل الموقع معك</noscript>
    <div id="root" style="min-height: 100vb;display: flex;flex-direction: column;"></div>


    <script>
      window.globalConfig = {
        APP_DEBUG : parseInt("<?php echo e(env('APP_DEBUG')); ?>") , 
        APP_URL : "<?php echo e(env('APP_URL')); ?>",
        APP_NAME : "<?php echo e(env('APP_NAME')); ?>" ,
        APP_AR_NAME : "<?php echo e(env('APP_AR_NAME')); ?>" ,
        APP_EN_NAME : "<?php echo e(env('APP_EN_NAME')); ?>" 
      }
    </script>
  </body>
</html>
<?php /**PATH C:\Users\Ahmed\Desktop\ecommerce\laravel\resources\views/Dash.blade.php ENDPATH**/ ?>