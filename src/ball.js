
// Ball class
export class Ball {
  constructor(w, h, xStartPos, yStartPos) {
    this.width = w;
    this.height = h;
    this.x = xStartPos;
    this.y = yStartPos;
    this.dx = Math.random() * (10 - -10) + -10; // sets random start x velocity
    this.dy = Math.random() * (-6 - -5) + -5; // sets random start y velocity

    this.element = document.createElement("div");

    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.element.style.backgroundImage = 'url("./img/tileset.png")';

    this.tileID = Math.floor(Math.random() * 6) // random between 0-5
    this.element.style.backgroundPositionX = window.gFrames["Balls"][this.tileID].x + "px"; 
    this.element.style.backgroundPositionY = window.gFrames["Balls"][this.tileID].y + "px"; 
  }

  collides(target) {
    if (this.x > target.x + target.width || target.x > this.x + this.width) {
      return false
    }

    if (this.y > target.y + target.height || target.y > this.y + this.height) {
      return false
    }

    return true
  }

  update(dt) {
    this.x = this.x + this.dx * dt
    this.y = this.y + this.dy * dt

    if (this.x <= 0) {
      this.x = 0
      this.dx = -this.dx
    } else if (this.x >= 1280 - this.width) {
      this.x = 1280 - this.width
      this.dx = -this.dx
    } else if (this.y >= 720 - this.width) {
      this.y = 720 - this.width
      this.dy = -this.dy
    }

    this.render();
  }

  render() {
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";
  }
}