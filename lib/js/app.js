import Master from './modules/master';

var App = {
  init: function() {
    App.master = new Master();
    App.master.init();
    App.events();
    App.animateText();
    App.removeLoadingScreen();
    App.master.onResize();
    console.log('Mechanics is open source! https://github.com/meatbags/mcncs.io');
  },

  animateText: function() {
    // animate title text
    const text = `<div class="letter">${$('.main__inner__title').html().split('').join('</div><div class="letter">')}</div>`;
    const ms = 200;
    $('.main__inner__title').html(text);
    $('.main__inner__title').addClass('active');

    // cascade letters
    setTimeout(() => {
      $('.letter').each((i, e) => {
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
    }, 2000);

    // fade in nav bar
    setTimeout(() => {
      $('.nav').removeClass('hidden');
    }, 5000);
  },

  events: function() {
    $('.menu-button').on('click', function() {
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
  },

  closeMenu: function() {
    $('.menu').removeClass('active');
    $('.nav').removeClass('active');
    $('.main__inner__title').removeClass('hidden');
    App.master.onMenuClose();
  },

  removeLoadingScreen: function() {
    // remove loading screen
    $('.loading').fadeOut(1000, () => { $('.loading').remove(); });
  }
};

window.onload = App.init;
