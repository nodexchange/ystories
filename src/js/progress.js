class Progress {
  constructor(sliderClass, cubeClass) {
    this.displayTime = 0;
    this.lastUpdated = 0;
    this.adProgress = document.getElementsByClassName('progress')[0];
    this.activateProgressBar();
    this.lastTriggered = 0;
    this.slider = sliderClass;
    this.cube = cubeClass;
    this.progressTimer = {};
  }
  activateProgressBar() {
    this.progressTimer = setInterval(() => {
      this.displayTime += 1;
      // var percent = (player.currentTime() / player.duration()) * 100; 
      this.updateProgressBar(this.displayTime, this.adProgress);
    }, 200);
  }
  disableProgressBar() {
    clearInterval(this.progressTimer);
    this.displayTime = 100;
    this.updateProgressBar(this.displayTime, this.adProgress);
    
    // console.log('disabled + _+_+_+ ');
  }
  
  updateProgressBar(value, adProgress) {
    let width = Math.ceil(value);
    let differenceSinceLastUpdate = width - this.lastUpdated;
    if (differenceSinceLastUpdate > 2.5) {
      // console.log('>> ' + width);
      this.lastUpdated = width;
      adProgress.style.width = width + '%';
    }
    // console.log('last triggered === ' + this.lastTriggered, value);
    if (value > 21 && this.lastTriggered === 0) {
      this.lastTriggered = 1;
      this.slider.nextScreen();
      this.cube.rotateRight();
      // console.log(this.lastTriggered);
    } else if (value > 41 && this.lastTriggered === 1) {
      this.lastTriggered = 2;
      this.slider.nextScreen();
      this.cube.rotateRight();
    } else if (value > 61 && this.lastTriggered === 2) {
      this.lastTriggered = 3;
      this.slider.nextScreen();
      this.cube.rotateRight();
    } else if (value > 81 && this.lastTriggered === 3) {
      this.lastTriggered = 4;
      this.cube.rotateRight();
      this.slider.nextScreen();
    }
    if (width > 96 && width !== 100) {
      this.disableProgressBar();
    }
  }
  
}