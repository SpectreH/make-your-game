// Grid class
export class Grid {
  constructor(w, h) {
    this.width = w;
    this.height = h;

    this.element = document.querySelector(".grid");
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  }
}

// Ball class
export class Ball {
  constructor(w, h, xStartPos, yStartPos) {
    this.width = w;
    this.height = h;
    this.x = xStartPos;
    this.y = yStartPos;
    this.dx = Math.random() * (10 - -10) + -10; // sets random start x velocity
    this.dy = Math.random() * (-6 - -5) + -5; // sets random start y velocity

    this.element = document.createElement("img");
    this.element.setAttribute("src", "./img/ball.png")
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";
  }

  collides(target) {
    if (this.x > target.x + target.width || target.x > this.x + this.width) {
      return false
    }
    
    if(this.y > target.y + target.height || target.y > this.y + this.height) {
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
    } else if (this.x >= 1280 - 20) {
      this.x = 1280 - 20
      this.dx = -this.dx
    } else if (this.y <= 0) {
      this.y = 0
      this.dy = -this.dy
    } else if (this.y >= 720 - 20) {
      this.y = 720 - 20
      this.dy = -this.dy
    }
    
    this.render();
  }

  render() {
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";
  }
}