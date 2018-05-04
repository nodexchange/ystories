class Cube {
  constructor() {
    this.cubeRoot = document.getElementsByClassName('ybox')[0];
    this.sides = {};
    this.sides.front = this.cubeRoot.querySelector('--front');
    this.sides.left = this.cubeRoot.querySelector('--left');
    this.sides.right = this.cubeRoot.querySelector('--right');
    this.sides.back = this.cubeRoot.querySelector('--back');
    this.currentRotation = 0;
  }

  rotateLeft() {
    this.animateCube('left');
  }
  
  rotateRight() {
    this.animateCube('right');
  }
  
  animateCube(direction) {
    console.log('HERE>>>');
    let slightOffset = 0;
    if (direction === 'right') {
      slightOffset = this.currentRotation + 10;
      this.currentRotation -= 90;
    } else {
      slightOffset = this.currentRotation - 10;
      this.currentRotation += 90;
    }
    this.cubeRoot.style.transform = 'rotateY(' + parseInt(slightOffset) + 'deg) scaleX(0.8) scaleY(0.8)';
    setTimeout(() => {
      this.cubeRoot.style.transform = 'rotateY(' + parseInt(this.currentRotation + 10) + 'deg) scaleX(0.9) scaleY(0.9)';
    }, 500);
    setTimeout(() => {
      this.cubeRoot.style.transform = 'rotateY(' + this.currentRotation + 'deg) scaleX(1) scaleY(1)';
    }, 1200);
  }
}