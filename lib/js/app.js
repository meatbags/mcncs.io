import Master from './modules/master';
import MenuCanvas from './modules/menu_canvas';

var App = {
  init: function() {
    App.master = new Master();
    App.master.init();
    App.events();
    App.animateText($('.main__inner__title'), 2000);
    App.showNav();
    App.removeLoadingScreen();
    App.master.onResize();
    App.menuCanvas = new MenuCanvas();
    App.menuCanvas.draw();
    console.log('Mechanics is open source! https://github.com/meatbags/mcncs.io');
  },

  animateText: function(elements, start) {
    // animate title text
    elements.each(function(item, elem){
      const $elem = $(elem);
      const text = `<div class="letter target">${$elem.html().split('').join('</div><div class="letter target">')}</div>`;
      const ms = 200;
      $elem.html(text);
      $elem.addClass('active');

      // cascade letters
      setTimeout(() => {
        $('.letter.target').each((i, e) => {
          $(e).removeClass('target');
          setTimeout(
            () => {
              $(e).addClass('active red');
              setTimeout(
                () => {
                  $(e).removeClass('red');
                }, ms
              )
            }
          , (i + 1) * ms)
        });
      }, start);
    });
  },

  showNav: function() {
    // fade in nav bar

    setTimeout(() => {
      $('.nav').removeClass('hidden');
    }, 4000);
  },

  events: function() {
    $('.menu-button, .toggle-menu').on('click', function() {
      App.toggleMenu();
    });
    $('.menu-close').on('click', function() {
      App.closeMenu();
    });
    $(window).on('blur', function() {
      App.master.onBlur();
    });
    $(window).on('focus', function() {
      App.master.onFocus();
    });
  },

  toggleMenu: function() {
    if (!$('.menu').hasClass('active')) {
      App.openMenu();
    } else {
      App.closeMenu();
    }
  },

  openMenu: function() {
    $('.menu').addClass('active');
    $('.nav').addClass('active');
    $('.main__inner__title').addClass('hidden');
    App.master.onMenu();
    setTimeout(() => { $('.menu__content').addClass('active'); }, 800);
    /*
    $('.menu__content .cascade').each(function(i, e) {
      const $e = $(e);
      setTimeout(() => {
        $e.addClass('active');
      }, 1000 + (i * 150));
    });
    */
  },

  closeMenu: function() {
    $('.menu').removeClass('active');
    $('.nav').removeClass('active');
    $('.main__inner__title').removeClass('hidden');
    App.master.onMenuClose();
    setTimeout(() => { $('.menu__content').removeClass('active'); }, 800);
  },

  removeLoadingScreen: function() {
    // remove loading screen
    $('.loading').fadeOut(500, () => { $('.loading').remove(); });
  }
};

window.onload = App.init;
