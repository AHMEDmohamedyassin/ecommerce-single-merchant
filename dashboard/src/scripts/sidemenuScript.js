import $ from 'jquery'



$(function () {

    $('[data-animate="sidemenu"]  [data-animate="sidemenuicon"]').each(function () {

        $(this).click(function () {
            let status = $('[data-animate="sidemenu"]').attr('data-status')

            // togglling icons
            $('[data-animate="sidemenu"] [data-animate="sidemenuicon"]').each(function () {
                $(this).toggleClass("hidden")
            })

            if(status && status == 'open'){
                // closing menu
                $('[data-animate="sidemenu"]').animate({"width" : "60px"})
                
                $('[data-animate="mainAppContainer"]').animate({"paddingRight" : "80px"})

                $('[data-animate="sidemenu"]').attr('data-status' , 'close')
            }else {
                // opennign menu
                $('[data-animate="sidemenu"]').animate({"width" : "200px"})

                $('[data-animate="mainAppContainer"]').animate({"paddingRight" : "222px"})

                $('[data-animate="sidemenu"]').attr('data-status' , 'open')
            }
        })
        
    })
})