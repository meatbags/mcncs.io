import { Master } from './modules';

class App {
  constructor() {
    // mcncs website handler

    this.master = new Master();
    //this.animateText($('.main__inner__title'), 2000);
    this.showNav();
    this.removeLoadingScreen();
    this.master.loop();
    console.log('Mechanics is open source! https://github.com/meatbags/mcncs.io');
  }

  animateText(elements, start) {
    // animate title text

    elements.each(function(item, elem) {
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
  }

  showNav() {
    // fade in nav bar

    setTimeout(() => {
      $('.nav').removeClass('hidden');
    }, 4000);
  }

  removeLoadingScreen() {
    // rm loading

    $('.loading').fadeOut(500, () => { $('.loading').remove(); });
  }
}

window.onload = () => { const MCNCS = new App(); };
