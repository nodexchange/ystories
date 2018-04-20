
class Navigation {
  constructor(slider, progress) {
    this.slider = slider;
    this.progress = progress;
    this.enableMouseNavigation();
    this.enableKeyboardNavigation();
  }

  enableMouseNavigation() {
    document.getElementsByClassName('button next-screen')[0].addEventListener('click', () => {
      this.slider.nextScreen();
    });
    document.getElementsByClassName('prev-screen')[0].addEventListener('click', () => {
      this.slider.prevScreen();
    });
    document.getElementsByClassName('close')[0].addEventListener('click', () => {
      this.slider.closeModal();
    });
    document.getElementsByClassName('open-walkthrough')[0].addEventListener('click', () => {
      this.slider.openModal();
    });  
  }

  enableKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      const keyCode = event.keyCode;
      switch (keyCode) {
        case 37:
          // left
          this.slider.prevScreen();
          break;
        case 38:
          // up
          this.slider.openModal();
          break;
        case 39:
          // right
          this.slider.nextScreen();
          break;
        case 40:
          // down
          this.slider.closeModal();
          break;
        default:
          return;
      }
      event.preventDefault();
    });
  }
}