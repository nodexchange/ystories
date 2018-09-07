class Progress {
  constructor(sliderClass, cubeClass) {
    this.displayTime = 0;
    this.lastUpdated = 0;
    this.adProgress = document.getElementsByClassName('progress')[0];
    this.activateProgressBar();
    this.lastTriggered = 0;
    this.slider = sliderClass;
    this.cube = cubeClass;
  }
  resetProgressBar() {
    this.lastUpdated = 0;
    this.displayTime = 0;
    this.adProgress.style.transition = 'width 0.4s';
    this.adProgress.style.width = '0%';
    this.adProgress.parentNode.style.opacity = 0.9;
    this.adProgress.parentNode.style.height = '2px';
    clearTimeout(this.progressComplete);
  }
  activateProgressBar() {
    this.resetProgressBar();
    if (this.lastTriggered === 4) {
      this.hideProgressBar();
      return;
    }
    this.progressComplete = setTimeout(() => {
      this.progressCompleteHandler();
    // }, 8000);
    }, 800);
    setTimeout(() => {
      this.adProgress.style.transition = 'width 8s';
      this.adProgress.style.width = '100%';
    }, 500);
  }

  progressCompleteHandler() {
    this.hideProgressBar();
    setTimeout(() => {
      this.updateRadios(true);
    }, 1000);
  }

  hideProgressBar() {
    this.adProgress.parentNode.style.height = 0;
    this.adProgress.parentNode.style.opacity = 0;
  }

  updateRadios(nextSlide) {
    if (this.lastTriggered > 4) {
      return;
    }
    let radioButton = document.getElementById('input' + (this.lastTriggered + 1));
    radioButton.checked = true;
    if (nextSlide === true) {
      this.slider.nextSlide();
    }
  }
  nextArrowHandler() {
    this.lastTriggered = this.lastTriggered + 1;
    if (this.lastTriggered > 4) {
      this.lastTriggered = 4;
    }
    this.updateRadios(false);
    this.activateProgressBar();
  }
  prevArrowHandler() {
    this.lastTriggered = this.lastTriggered - 1;
    if (this.lastTriggered < 0) {
      this.lastTriggered = 0;
    }
    this.updateRadios(false);
    this.activateProgressBar();
  }
}
