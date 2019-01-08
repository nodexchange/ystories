/* global $AD */

class Footer {
  constructor(live) {
    this.ystoriesLogo = document.getElementsByClassName('footer-hotspot')[0];
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
      $AD.click('FooterClickthrough', {
        overrides: {
          url: 'https://uk.news.yahoo.com/'
        }
      });
    });
  }
}
