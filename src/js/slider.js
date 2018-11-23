/* global $AD */

class Slider {
  constructor({prevHandler, nextHandler}) {
    this.nextActionHandler = nextHandler;
    this.prevActionHandler = prevHandler;
  }
  activateSlider() {
    this.swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        init: () => {
          let currentSlide = document.getElementById('slide' + 0);
          let currentImage = currentSlide.getElementsByClassName('slide-image')[0];
          currentImage.className = 'slide-image slide-image-animation';
          this.addClickthroughs();
        }
      }
    });
    this.currentIndex = this.swiper.activeIndex;
    this.addEventTracking();
    this.swiper.on('slideChange', (el) => {
      let currentSlide = document.getElementById('slide' + this.currentIndex);
      let currentImage = currentSlide.getElementsByClassName('slide-image')[0];
      currentImage.className = 'slide-image';
      if (this.swiper.activeIndex > this.currentIndex) {
        this.nextActionHandler();
      } else if (this.swiper.activeIndex < this.currentIndex) {
        this.prevActionHandler();
      }
      this.currentIndex = this.swiper.activeIndex;
      currentSlide = document.getElementById('slide' + this.currentIndex);
      currentImage = currentSlide.getElementsByClassName('slide-image')[0];
      currentImage.className = 'slide-image slide-image-animation';
    });
    // this.swiper.addEventListener('next', () => this.nextHandler);
    // this.swiper.addEventListener('prev', () => this.prevHandler);
  }
  addClickthroughs() {
    let slideImages = document.getElementsByClassName('slide-image');
    let slideText = document.getElementsByClassName('slide-text');
    for (let i = 0; i < slideImages.length; i++) {
      slideImages[i].addEventListener('click', (e) => this.clickHandler(e));
      slideText[i].addEventListener('click', (e) => this.clickHandler(e));
    }
    let slideLowerHotspot = document.getElementsByClassName('slide-hotspot')[0];
    slideLowerHotspot.addEventListener('click', (e) => this.clickHandler(e));
  }
  addEventTracking() {
    let nextButton = document.getElementsByClassName('swiper-button-next')[0];
    let prevButton = document.getElementsByClassName('swiper-button-prev')[0];
    nextButton.addEventListener('click', ()=>{
      let title = this.retrieveTitle(this.currentIndex - 1);
      $AD.event('Next Article : ' + title.innerHTML.substring(0, 50));
    });
    prevButton.addEventListener('click', ()=>{
      let title = this.retrieveTitle(this.currentIndex + 1);
      $AD.event('Prev Article' + title.innerHTML.substring(0, 50));
    });
  }
  clickHandler() {
    let title = this.retrieveTitle(this.currentIndex);
    let clickTag = 'Article Clickthrough : ' + title.innerHTML.substring(0, 50);
    $AD.click(clickTag, {
      overrides: {
        url: title.dataset.link
      }
    });
  }
  retrieveTitle(index) {
    let currentSlide = document.getElementById('slide' + index);
    let title = currentSlide.getElementsByClassName('slide-text')[0].childNodes[0];
    return title;
  }
  updateSlide(id) {
    this.swiper.slideTo(id);
  }
  nextSlide() {
    this.swiper.slideNext();
  }
}
