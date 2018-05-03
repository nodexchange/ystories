class Cube {
  constructor() {
    this.cubeRoot = document.getElementsByClassName('ybox')[0];
    this.sides = {};
    this.sides.front = this.cubeRoot.querySelector('--front');
    this.sides.left = this.cubeRoot.querySelector('--left');
    this.sides.right = this.cubeRoot.querySelector('--right');
    this.sides.back = this.cubeRoot.querySelector('--back');
    this.currentRotation = 0;
    console.log(this.sides);
    
    setTimeout(() => {
      console.log('________');
      this.rotateLeft();
    }, 1000);
    /*
    _3dface--front
    _3dface--left
    _3dface--right
    _3dface--back
    */
  }

  rotateLeft() {
    this.animateCube('left');
  }
  
  rotateRight() {
    this.animateCube('right');
  }
  
  animateCube(direction) {
    let slightOffset = 0;
    if (direction === 'right') {
      slightOffset = this.currentRotation + 20;
      this.currentRotation += 90;
    } else {
      slightOffset = this.currentRotation - 20;
      this.currentRotation -= 90;
    }
    console.log(' slightOffset >>> ' + slightOffset);
    this.cubeRoot.style.transform = 'rotateY(' + slightOffset + 'deg) scale(0.8);';
    setTimeout(() => {
      // this.cubeRoot.style.transform = 'rotateY(' + this.currentRotation + 'deg) scale(1)';
    }, 1300);
  }
}