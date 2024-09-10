import $ from 'jquery'

$(function () {

    $('[data-animation="collabsecontainer"]').each(function () {

        $(this).click(function (e) {
            $(this).find('[data-animation="collabseicon"]').toggleClass("hidden")
            $(this).find('[data-animation="collabsedata"]').css({'transition' : "none"}).slideToggle()
        })
    })
})