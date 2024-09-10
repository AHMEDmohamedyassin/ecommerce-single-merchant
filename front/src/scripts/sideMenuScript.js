import $ from "jquery"

/**
 * works by adding attribute to button : data-menubutton="sidemenu"
 * and adding attributes to menu container : data-menu="sidemenu" data-status="close" data-direction="right"
 */

$(function () {
    $('[data-menubutton]').each(function () {
        $(this).click(function () {
            let menu_name = $(this).attr('data-menubutton')
            let menu = $(`[data-menu="${menu_name}"]`)
            let close_animation = {right : "-100%"}
            let open_animation = {right : "0%"}

            // checking opening direction of menu
            if(menu.attr('data-direction') == 'left'){
                close_animation = {left : "-100%"}
                open_animation = {left : "0%"}
            }

            // openning side menu
            function openmenu () {
                menu.attr('data-status' , 'open')

                menu.removeClass('hidden').addClass("custom-dimming").promise().done(function() {
                    menu.find('div:first').css('transition', 'none').animate(open_animation , 400 )
                })
                
                $('body , html').css('overflow' , 'hidden')
            }
    
            // closing side menu
            function closemenu () {
                menu.attr('data-status' , 'close')

                menu.find('div:first').css('transition', 'none').animate(close_animation , 400 , function () {
                    menu.removeClass("custom-dimming").promise().done(function () {
                        menu.addClass('hidden')
                    })
                })

                $('body , html').css('overflow' , 'auto')
            }

            // check if menu is open or closed to do reversed action
            if(menu.attr('data-status') == 'close') 
                openmenu()
            else closemenu()


            menu.click(function (e) {
                if(e.target == $(this)[0])
                    closemenu()
            })
        })
    })
})