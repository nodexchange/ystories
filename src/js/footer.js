/* global ONE */

class Footer {
  constructor(live) {
    this.ystoriesLogo = document.getElementsByClassName('ystories-logo-container')[0];
    this.activeLogoClickthrough();
    if (!live) {
      this.ystoryRadios = document.getElementById('ystory-radios');
      this.ystoryProgress = document.getElementsByClassName('progress-bar-container')[0];
      this.ystoryRadios.style.opacity = 0;
      this.ystoryProgress.style.visibility = 'hidden';
    }
  }

  activeLogoClickthrough() {
    this.ystoriesLogo.addEventListener('click', () => {
      ONE.click('Footer: Logo: Clickthrough');
    });
  }
}
