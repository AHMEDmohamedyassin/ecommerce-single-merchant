<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <?php if (isset($component)) { $__componentOriginal372ba07e15bcac5413dbbd3b17942c12 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal372ba07e15bcac5413dbbd3b17942c12 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.MetaComponent','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('MetaComponent'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(Illuminate\View\AnonymousComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?> <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal372ba07e15bcac5413dbbd3b17942c12)): ?>
<?php $attributes = $__attributesOriginal372ba07e15bcac5413dbbd3b17942c12; ?>
<?php unset($__attributesOriginal372ba07e15bcac5413dbbd3b17942c12); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal372ba07e15bcac5413dbbd3b17942c12)): ?>
<?php $component = $__componentOriginal372ba07e15bcac5413dbbd3b17942c12; ?>
<?php unset($__componentOriginal372ba07e15bcac5413dbbd3b17942c12); ?>
<?php endif; ?>
    
    <!-- description -->
    <meta name="description" content="<?php echo e($collection->description); ?>" />
    
    <meta name="keywords" content="<?php echo e($key_words); ?>">
    
    <meta property="og:title" content="<?php echo e($collection->title); ?>">
    <meta property="og:description" content="<?php echo e($collection->description); ?>">
    <meta property="og:image" content="<?php echo e($image); ?>">
    <meta property="og:url" content="<?php echo e($page_url); ?>">
    
    <meta name="twitter:card" content="<?php echo e($image); ?>">
    <meta name="twitter:title" content="<?php echo e($collection->title); ?>">
    <meta name="twitter:description" content="<?php echo e($collection->description); ?>">
    <meta name="twitter:image" content="<?php echo e($image); ?>">
    

    <?php if (isset($component)) { $__componentOriginalb9b51a1a4669affc9cad2fb34cebbfd1 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalb9b51a1a4669affc9cad2fb34cebbfd1 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.CDNComponent','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('CDNComponent'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(Illuminate\View\AnonymousComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?> <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalb9b51a1a4669affc9cad2fb34cebbfd1)): ?>
<?php $attributes = $__attributesOriginalb9b51a1a4669affc9cad2fb34cebbfd1; ?>
<?php unset($__attributesOriginalb9b51a1a4669affc9cad2fb34cebbfd1); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalb9b51a1a4669affc9cad2fb34cebbfd1)): ?>
<?php $component = $__componentOriginalb9b51a1a4669affc9cad2fb34cebbfd1; ?>
<?php unset($__componentOriginalb9b51a1a4669affc9cad2fb34cebbfd1); ?>
<?php endif; ?>

    <title><?php echo e($collection->title); ?></title>
    

    <?php if (isset($component)) { $__componentOriginalc35b7c9bbdbeeb1eba3a14601dea4726 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalc35b7c9bbdbeeb1eba3a14601dea4726 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.ReactFilesComponent','data' => ['type' => 'front']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('ReactFilesComponent'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(Illuminate\View\AnonymousComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes(['type' => 'front']); ?> <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalc35b7c9bbdbeeb1eba3a14601dea4726)): ?>
<?php $attributes = $__attributesOriginalc35b7c9bbdbeeb1eba3a14601dea4726; ?>
<?php unset($__attributesOriginalc35b7c9bbdbeeb1eba3a14601dea4726); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalc35b7c9bbdbeeb1eba3a14601dea4726)): ?>
<?php $component = $__componentOriginalc35b7c9bbdbeeb1eba3a14601dea4726; ?>
<?php unset($__componentOriginalc35b7c9bbdbeeb1eba3a14601dea4726); ?>
<?php endif; ?>
    
  </head>
  <body>
      <div style="height: 0rem; width: 0px;overflow:hidden">
        <h1><?php echo e($collection->title); ?></h1>
        <p><?php echo e($collection->description); ?></p>
        <p><?php echo e($collection->average_price); ?></p>
        <p><?php echo e($collection->publish_date); ?></p>
      </div>

      <?php if (isset($component)) { $__componentOriginal5c8133adad7001e239c525258d15c41a = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5c8133adad7001e239c525258d15c41a = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.BodyComponent','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('BodyComponent'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(Illuminate\View\AnonymousComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?> <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5c8133adad7001e239c525258d15c41a)): ?>
<?php $attributes = $__attributesOriginal5c8133adad7001e239c525258d15c41a; ?>
<?php unset($__attributesOriginal5c8133adad7001e239c525258d15c41a); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5c8133adad7001e239c525258d15c41a)): ?>
<?php $component = $__componentOriginal5c8133adad7001e239c525258d15c41a; ?>
<?php unset($__componentOriginal5c8133adad7001e239c525258d15c41a); ?>
<?php endif; ?>

      <script type="application/ld+json">
        {
          "@context": "<?php echo e($page_url); ?>",
          "@type": "Product",
          "name": "<?php echo e($collection->title); ?>",
          "image": "<?php echo e($image); ?>",
          "description": "<?php echo e($collection->description); ?>",
          "sku": "$collection->serial",
          "brand": {
            "@type": "Brand",
            "name": "<?php echo e(env('APP_NAME')); ?>"
          },
          "offers": {
            "@type": "Offer",
            "url": "<?php echo e($page_url); ?>",
            "priceCurrency": "EGP",
            "price": "<?php echo e($collection->average_price); ?>",
            "itemCondition": "NewCondition",
            "availability": "InStock",
            "seller": {
              "@type": "Organization",
              "name": "<?php echo e(env('APP_NAME')); ?>"
            }
          }
        }
        </script>      
  </body>
</html>
<?php /**PATH C:\Users\Ahmed\Desktop\ecommerce\laravel\resources\views/Product.blade.php ENDPATH**/ ?>