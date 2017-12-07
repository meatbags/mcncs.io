import Master from './modules/master';

var App = {
  init: function() {
    console.log('Mechanics is open source! https://github.com/meatbags/mcncs.io');
    App.master = new Master();
    App.master.init();
    App.events();
  },

  events: function() {
    $('.menu-button').on('click', function() {
      $('.menu').addClass('active');
      $('.nav').addClass('active');
    });
    $('.menu-close').on('click', function() {
      $('.menu').removeClass('active');
      $('.nav').removeClass('active');
    })
  }
};

window.onload = App.init;
