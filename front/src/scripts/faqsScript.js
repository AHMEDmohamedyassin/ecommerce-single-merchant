import $ from 'jquery'

$(function () {

    $("[data-animation='question']").each(function () {
        $(this).click(function () {
            $(this).parent().find("[data-animation='answer']")
            .css('transition', 'none').slideToggle();
            
            $(this).find("[data-animation='iconcontainer']").toggleClass('bg-secondarycolor text-secondarybg bg-secondarybg text-secondarycolor')

            $(this).find("[data-animation='inactiveicon']").toggle()
            $(this).find("[data-animation='activeicon']").toggle()

            $(this).toggleClass("bg-secondarycolor text-secondarybg bg-secondarybg")
        });
    });
})
