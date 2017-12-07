import Master from './modules/master';

var App = {
  init: function() {
    App.master = new Master();
    App.master.init();
    App.events();
    App.animateText();
    App.removeLoadingScreen();
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
    })
  },

  toggleMenu: function() {
    if (!$('.menu').hasClass('active')) {
      $('.menu').addClass('active');
      $('.nav').addClass('active');
      $('.main__inner__title').addClass('hidden');
    } else {
      App.closeMenu();
    }
  },

  closeMenu: function() {
    $('.menu').removeClass('active');
    $('.nav').removeClass('active');
    $('.main__inner__title').removeClass('hidden');
  },

  removeLoadingScreen: function() {
    // remove loading screen
    $('.loading').fadeOut(1000, () => { $('.loading').remove(); });
  }
};

window.onload = App.init;
