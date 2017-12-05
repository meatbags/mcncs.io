import Master from './modules/master';

var App = {
  init: function() {
    App.master = new Master();
    App.master.init();
    console.log('Mechanics is open source! https://github.com/meatbags/mcncs.io');
  }
};

window.onload = App.init;
