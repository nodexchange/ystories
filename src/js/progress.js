class Progress {
  constructor(sliderClass) {
    this.displayTime = 0;
    this.lastUpdated = 0;
    this.adProgress = document.getElementsByClassName('progress')[0];
    this.activateProgressBar();
    this.lastTriggered = 0;
    this.slider = sliderClass;
    this.progressTimer = {};
  }
  activateProgressBar() {
    this.progressTimer = setInterval(() => {
      this.displayTime += 0.4;
      // var percent = (player.currentTime() / player.duration()) * 100; 
      this.updateProgressBar(this.displayTime, this.adProgress);
    }, 200);
  }
  disableProgressBar() {
    clearInterval(this.progressTimer);
    this.displayTime = 100;
    this.updateProgressBar(this.displayTime, this.adProgress);
  }
  
  updateProgressBar(value, adProgress) {
    let width = Math.ceil(value);
    let differenceSinceLastUpdate = width - this.lastUpdated;
    if (differenceSinceLastUpdate > 2.5) {
      console.log('>> ' + width);
      this.lastUpdated = width;
      adProgress.style.width = width + '%';
    }
    if (value > 21 && this.lastTriggered !== 1) {
      this.lastTriggered += 1;
      this.slider.nextScreen();
    } else if (value > 41) {
      this.lastTriggered += 1;
      this.slider.nextScreen();
    } else if (value > 61) {
      this.lastTriggered += 1;
      this.slider.nextScreen();
    } else if (value > 81) {
      this.lastTriggered += 1;
      this.slider.nextScreen();
    }
    if (width > 96 && width !== 100) {
      this.disableProgressBar();
    }
  }
  
}