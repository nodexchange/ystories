class Cube {
  constructor() {
    this.cubeRoot = document.getElementsByClassName('ybox')[0];
    this.sides = {};
    this.sides.front = this.cubeRoot.getElementsByClassName('yface--front')[0];
    this.sides.left = this.cubeRoot.getElementsByClassName('yface--left')[0];
    this.sides.right = this.cubeRoot.getElementsByClassName('yface--right')[0];
    this.sides.back = this.cubeRoot.getElementsByClassName('yface--back')[0];
    this.currentRotation = 0;

    setTimeout(() => {
      this.cubeRoot.parentElement.className += ' spaceReveal';
    }, 1000);
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
    this.cubeRoot.style.transform = 'rotateY(' + parseInt(slightOffset) + 'deg) scaleX(0.8) scaleY(0.8) scaleZ(0.8)';
    this.hideText();
    setTimeout(() => {
      this.cubeRoot.style.transform = 'rotateY(' + parseInt(this.currentRotation + 10) + 'deg) scaleX(0.86) scaleY(0.86) scaleZ(0.86)';
    }, 400);
    setTimeout(() => {
      this.cubeRoot.style.transform = 'rotateY(' + this.currentRotation + 'deg) scaleX(1) scaleY(1) scaleZ(1)';
      this.revealText();
    }, 1100);
  }

  revealText() {
    for (var prop in this.sides) {
      // skip loop if the property is from prototype
      if(!this.sides.hasOwnProperty(prop)) continue;
      // your code
      // alert(prop + " = " + this.sides[prop]);
      this.sides[prop].getElementsByTagName('p')[0].className = 'paragraphReveal';
      this.sides[prop].getElementsByTagName('h3')[0].className = 'headerReveal';
      console.log(this.sides[prop].getElementsByTagName('p').className);
    }
  }
  hideText() {
    for (var prop in this.sides) {
      // skip loop if the property is from prototype
      if(!this.sides.hasOwnProperty(prop)) continue;
      // your code
      // alert(prop + " = " + this.sides[prop]);
      this.sides[prop].getElementsByTagName('p')[0].className = 'paragraphHide';
      this.sides[prop].getElementsByTagName('h3')[0].className = 'headerHide';
    }
  }
}