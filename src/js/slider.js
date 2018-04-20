class Slider {
  constructor({nextButtonClass, prevButtonClass, finishButtonClass}) {
    this.index = 0
    this.nextButtonClassName = nextButtonClass;
    this.prevButtonClassName = prevButtonClass;
    this.finishButtonClassName = finishButtonClass;
  }

  nextScreen() {
    if (this.index < this.indexMax()) {
      this.index += 1;
      this.updateScreen();
    }
  }

  prevScreen() {
    if (this.index > 0) {
      this.index -= 1;
      this.updateScreen();
    }
  }

  updateScreen() {
    this.reset();
    this.goTo(this.index);
    this.setBtns();
  }

  setBtns() {
    let nextBtn = document.getElementsByClassName(this.nextButtonClassName)[0];
    let prevBtn = document.getElementsByClassName(this.prevButtonClassName)[0];
    let lastBtn = document.getElementsByClassName(this.finishButtonClassName)[0];
    if (this.index === this.indexMax()) {
      nextBtn.setAttribute('disabled', true);
      prevBtn.setAttribute('disabled', false);
      lastBtn.classList.add('active');
      lastBtn.removeAttribute('disabled');
      return;
    } else if (this.index === 0) {
      nextBtn.setAttribute('disabled', false);
      prevBtn.setAttribute('disabled', true);
      lastBtn.classList.remove('active');
      lastBtn.setAttribute('disabled', true);
      return
    }
    nextBtn.setAttribute('disabled', false);
    prevBtn.setAttribute('disabled', false);
    lastBtn.classList.remove('active');
    lastBtn.setAttribute('disabled', true);
  }

  goTo(index) {
    try {
      document.getElementsByClassName('screen')[index].classList.add('active');
      document.getElementsByClassName('dot')[index].classList.add('active');
    } catch (e) {
      console.log('goTo failed', e);
    }
  }

  reset() {
    let dots = document.getElementsByClassName('dot');
    for (let i = 0; i < dots.length; i++) {
      try {
        document.getElementsByClassName('screen')[i].classList.remove('active');
      } catch (e) {
        console.log('screen not found (yet?)');
      }
      try {
        document.getElementsByClassName('dot')[i].classList.remove('active');
      } catch (e) {
        console.log('dots not found (yet?)');
      }
    }
  }

  indexMax() {
    let screens = document.getElementsByClassName('screen');
    return screens.length - 1;
  }

  closeModal() {
    document.getElementsByClassName('walkthrough')[0].classList.remove('reveal');
    return setTimeout(() => {
      document.getElementsByClassName('walkthrough')[0].classList.remove('show');
      this.index = 0;
      return this.updateScreen();
    }, 200);
  }

  openModal() {
    document.getElementsByClassName('walkthrough')[0].classList.add('show');
    setTimeout((() => {
      document.getElementsByClassName('walkthrough')[0].classList.add('reveal');
    }), 200);
    return this.updateScreen();
  }

};