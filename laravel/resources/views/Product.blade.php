<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <x-MetaComponent></x-MetaComponent>
    
    <!-- description -->
    <meta name="description" content="{{$collection->description}}" />
    {{-- key words  --}}
    <meta name="keywords" content="{{$key_words}}">
    {{-- social sharing  --}}
    <meta property="og:title" content="{{$collection->title}}">
    <meta property="og:description" content="{{$collection->description}}">
    <meta property="og:image" content="{{$image}}">
    <meta property="og:url" content="{{$page_url}}">
    {{-- twitter      --}}
    <meta name="twitter:card" content="{{$image}}">
    <meta name="twitter:title" content="{{$collection->title}}">
    <meta name="twitter:description" content="{{$collection->description}}">
    <meta name="twitter:image" content="{{$image}}">
    

    <x-CDNComponent></x-CDNComponent>

    <title>{{$collection->title}}</title>
    

    <x-ReactFilesComponent type="front"></x-ReactFilesComponent>
    
  </head>
  <body>
      <div style="height: 0rem; width: 0px;overflow:hidden">
        <h1>{{$collection->title}}</h1>
        <p>{{$collection->description}}</p>
        <p>{{$collection->average_price}}</p>
        <p>{{$collection->publish_date}}</p>
      </div>

      <x-BodyComponent></x-BodyComponent>

      <script type="application/ld+json">
        {
          "@context": "{{$page_url}}",
          "@type": "Product",
          "name": "{{$collection->title}}",
          "image": "{{$image}}",
          "description": "{{$collection->description}}",
          "sku": "$collection->serial",
          "brand": {
            "@type": "Brand",
            "name": "{{env('APP_NAME')}}"
          },
          "offers": {
            "@type": "Offer",
            "url": "{{$page_url}}",
            "priceCurrency": "EGP",
            "price": "{{$collection->average_price}}",
            "itemCondition": "NewCondition",
            "availability": "InStock",
            "seller": {
              "@type": "Organization",
              "name": "{{env('APP_NAME')}}"
            }
          }
        }
        </script>      
  </body>
</html>
