/* global ONE */

class Footer {
  constructor() {
    this.ystoriesLogo = document.getElementsByClassName('ystories-logo-container')[0];
    this.activeLogoClickthrough();
  }

  activeLogoClickthrough() {
    this.ystoriesLogo.addEventListener('click', () => {
      ONE.click('Footer: Logo: Clickthrough');
    });
  }
}
