class Cube {
  constructor() {
    this.cubeRoot = document.getElementsByClassName('ybox')[0];
    this.sides = {};
    this.sides.front = this.cubeRoot.querySelector('--front');
    this.sides.left = this.cubeRoot.querySelector('--left');
    this.sides.right = this.cubeRoot.querySelector('--right');
    this.sides.back = this.cubeRoot.querySelector('--back');
    console.log(this.sides);
    /*
    _3dface--front
    _3dface--left
    _3dface--right
    _3dface--back
    */
  }
}