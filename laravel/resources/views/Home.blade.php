<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <x-MetaComponent></x-MetaComponent>

    <meta name="description" content="{{$description}}" />
    <meta name="keywords" content="{{$keywords}}" />

    <x-CDNComponent></x-CDNComponent>

    <title>{{env('APP_NAME')}}</title>
    

    <x-ReactFilesComponent type="front"></x-ReactFilesComponent>
  
  </head>
  <body>

    <div style='height: 0rem; width: 0px;overflow:hidden'>
      @php 
        echo $html;
      @endphp
    </div>

    <x-BodyComponent></x-BodyComponent>

    <script type="application/ld+json">
      @php
        echo $script;
      @endphp
    </script>
  </body>
</html>
