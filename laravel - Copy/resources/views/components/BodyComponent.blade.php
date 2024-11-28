<noscript>تحتاج إلي تشغيل الجافاسكريبت حتي يعمل الموقع معك</noscript>
<div id="root" style="min-height: 100vb;display: flex;flex-direction: column;"></div>


<script>
  window.globalConfig = {
    APP_DEBUG : parseInt("{{env('APP_DEBUG')}}") , 
    APP_URL : "{{env('APP_URL')}}",
    APP_NAME : "{{env('APP_NAME')}}" ,
    APP_AR_NAME : "{{env('APP_AR_NAME')}}" ,
    APP_EN_NAME : "{{env('APP_EN_NAME')}}" 
  }
</script>