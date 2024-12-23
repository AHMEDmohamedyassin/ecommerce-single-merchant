
<?php 
$js_dir = public_path("/{$type}/static/js");
$css_dir = public_path("/{$type}/static/css");
$tags = '';

// js files
if(is_dir($js_dir)){
  $js = null;
  $files = scandir($js_dir);
  foreach ($files as $key => $value) {
    if(preg_match("/^main.*\.js$/", $value))
      $tags = "<script defer src=". asset("/{$type}/static/js/{$value}") . "></script>";
  }
}

// css files
if(is_dir($css_dir)){
  $css = null;
  $files = scandir($css_dir);
  foreach ($files as $key => $value) {
    if(preg_match("/^main.*\.css$/", $value))
      $tags .= "<link href=". asset("/{$type}/static/css/{$value}") ." rel='stylesheet'>";
  }
}

echo $tags;
?><?php /**PATH C:\Users\ahmed\Desktop\ecommerce\ecommerce-single-merchant\laravel\resources\views/components/ReactFilesComponent.blade.php ENDPATH**/ ?>