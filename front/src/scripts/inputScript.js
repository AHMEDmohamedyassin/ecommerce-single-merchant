import $ from 'jquery'

$(function () {

    $('.custom-inputcontainer input').each(function(){
        $(this).focus(function () {
            $(this).parent().find('label').css("fontSize" , "10px").animate({
                top : "0"
            } , 200)
        })
        $(this).blur(function () {
            if($(this).val().length) return 
            $(this).parent().find('label').css("fontSize" , "12px").animate({
                top : "50%" ,
            } , 200)
        })
    })
})