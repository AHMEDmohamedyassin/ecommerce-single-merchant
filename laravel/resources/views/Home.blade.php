<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="موقع 'هاند ميد' يتيح فرصة لأصحاب المشاريع الصغيرة و الطلاب علي بيع منتجاتهم , يساعد موقع 'هاند ميد' أصحاب المشاريع الصغير أو الطلاب في الكليات العملية علي بيع منتجاتهم , حيث يساعدهم علي عرض منتجاتهم بشكل احترافي و بدون أي رسوم , و يساعد الوقع أيضا العملاء علي ايجاد منتجات بأسعار مناسبة , يمكنكم التواصل معنا علي الأرقام التالية 01066404523  أو 01141244031 و يمكنكم التواصل معنا عن طريق الايميل support@elhandmade.shop"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href='{{asset("/build/static/css/".env("CSSFILE").".css")}}' />
    <title>الهاند ميد , ElHandMade.com</title>
  </head>
  <body>
    <noscript>تحتاج إلي تشغيل الجافاسكريبت حتي يعمل الموقع معك</noscript>
    <div id="root" style="min-height: 100vb;display: flex;flex-direction: column;"></div>


    <script>
        window.globalConfig = {
            APP_DEBUG : true ,
            APP_URL : "http://192.168.1.8:8000",
            URL:[ // all , auth , public , none
              {url : '/dashboard/user' , title:'بيانات المستخدم' , sidebar : 'auth' , header:'none' , footer:'all'},
              {url : '/auth/login' , title:'تسجيل الدخول' , sidebar : 'public' , header:'public' , footer:'all'},
              {url : '/favorite' , title:'المفضلة' , sidebar : 'all' , header:'all' , footer:'all'},
              {url : '/' , title:'الرئيسية' , sidebar : 'all' , header:'none' , footer:'all'},
              {url : '/products' , title:'منتجات' , sidebar : 'all' , header:'none' , footer:'all'},
              // {url : '/product/2' , title:'منتج' , sidebar : 'all' , header:'all' , footer:'all'},
              {url : '/categories' , title:'الأقسام' , sidebar : 'all' , header:'all' , footer:'all'},
              {url : '/about' , title:'معلومات عنا' , sidebar : 'all' , header:'public' , footer:'all'},
              {url : '/contact' , title:'تواصل معنا' , sidebar : 'all' , header:'all' , footer:'all'},
              {url : '/faq' , title:'الأسئلة' , sidebar : 'all' , header:'public' , footer:'all'},
              // {url : '/dashboard/product/update' , title:'تسجيل الدخول' , sidebar : 'all' , header:'public' , footer:'all'},
            ],
            dashboardURL:[
              {url : '/dashboard' , title:'لوحة التحكم' , sidebar : 'auth' , header:'none' , footer:'all'},
              {url : '/dashboard/store' , title:'بيانات متجرك' , sidebar : 'auth' , header:'none' , footer:'all'},
              {url : '/dashboard/product/create' , title:'إنشاء منتج' , sidebar : 'auth' , header:'auth' , footer:'all'},
            ],

            headerPublicURLs : [
              {url : '/' , title:'الرئيسية'},
              {url : '/about' , title:'معولمات عنا'},
              {url : '/contact' , title:'تواصل معنا'},
              {url : '/categories' , title:'الأقسام'},
              {url : '/auth/login' , title:'تسجيل الدخول'},
            ] ,
            headerVendorURLs : [
              {url : '/dashboard' , title:'لوحة التحكم'},
              {url : '/dashboard/product/create' , title:'إنشاء منتج'},
              {url : '/dashboard/store' , title:'بيانات المتجر'},
              {url : '/dashboard/user' , title:'بيانات المستخدم'},
            ] ,
            headerUserURLs : [
              {url : '/' , title:'الرئيسية'},
              {url : '/about' , title:'معولمات عنا'},
              {url : '/contact' , title:'تواصل معنا'},
              {url : '/categories' , title:'الأقسام'},
              {url : '/dashboard/user' , title:'بيانات المستخدم'},
            ] ,
            sideBarPublicURLs : [
              {url : '/' , title:'الرئيسية'},
              {url : '/about' , title:'معولمات عنا'},
              {url : '/contact' , title:'تواصل معنا'},
              {url : '/faq' , title:'الأسئلة الأكثر شيوعا'},
              {url : '/categories' , title:'الأقسام'},
              {url : '/products' , title:'أحدث المنتجات'},
              {url : '/products?order=ratedhigh' , title:'المنتجات الأعلي تقييما'},
              {url : '/favorite' , title:'المفضلة'},
              {url : '/auth/login' , title:'تسجيل الدخول'},
              {url : '/auth/register' , title:'إنشاء حساب'},
              {url : '/auth/register/vendor' , title:'إنشاء حساب تاجر'},
            ] ,
            sideBarVendorURLs : [
              {url : '/dashboard' , title:'لوحة التحكم'},
              {url : '/dashboard/product/create' , title:'إنشاء منتج'},
              {url : '/dashboard/store' , title:'بيانات المتجر'},
              {url : '/dashboard/user' , title:'بيانات المستخدم'},
              {url : '/favorite' , title:'المفضلة'},
              {url : '/' , title:'الرئيسية'},
              {url : '/about' , title:'معولمات عنا'},
              {url : '/contact' , title:'تواصل معنا'},
              {url : '/faq' , title:'الأسئلة الأكثر شيوعا'},
              {url : '/categories' , title:'الأقسام'},
              {url : '/products' , title:'أحدث المنتجات'},
              {url : '/products?order=ratedhigh' , title:'المنتجات الأعلي تقييما'},
            ] ,
            sideBarUserURLs : [
              {url : '/dashboard/user' , title:'بيانات المستخدم'},
              {url : '/favorite' , title:'المفضلة'},
              {url : '/' , title:'الرئيسية'},
              {url : '/about' , title:'معولمات عنا'},
              {url : '/contact' , title:'تواصل معنا'},
              {url : '/faq' , title:'الأسئلة الأكثر شيوعا'},
              {url : '/categories' , title:'الأقسام'},
              {url : '/products' , title:'أحدث المنتجات'},
              {url : '/products?order=ratedhigh' , title:'المنتجات الأعلي تقييما'},
            ]
        }
    </script>
    <script src={{asset('/build/static/js/'.env("JSFILE").'.js')}}></script>
  </body>
</html>
