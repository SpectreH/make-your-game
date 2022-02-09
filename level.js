// Grid class
export class Grid {
  constructor(w, h) {
    this.Width = w;
    this.Height = h;

    this.Element = document.querySelector(".grid");
    this.Element.style.width = this.Width + "px";
    this.Element.style.height = this.Height + "px";
  }
}

// Ball class
export class Ball {
  constructor(w, h, xStartPos, yStartPos) {
    this.Width = w;
    this.Height = h;
    this.X = xStartPos;
    this.Y = yStartPos;
    this.dx = Math.random() * (10 - -10) + -10; // sets random start x velocity
    this.dy = Math.random() * (-6 - -5) + -5; // sets random start y velocity

    this.Element = document.createElement("img");
    this.Element.setAttribute("src", "./img/ball.png")
    this.Element.style.width = this.Width + "px";
    this.Element.style.height = this.Height + "px";
    this.Element.style.left = this.X + "px";
    this.Element.style.bottom = this.Y + "px";
  }

  collides(target) {
    if (this.X > target.X + target.Width || target.X > this.X + this.Width) {
      return false
    }
    
    if(this.Y > target.Y + target.Height || target.Y > this.Y + this.Height) {
      return false
    }

    return true
  }

  update(dt) {
    this.X = this.X + this.dx * dt
    this.Y = this.Y + this.dy * dt

    if (this.X <= 0) {
      this.X = 0
      this.dx = -this.dx
    } else if (this.X >= 1280 - 20) {
      this.X = 1280 - 20
      this.dx = -this.dx
    } else if (this.Y <= 0) {
      this.Y = 0
      this.dy = -this.dy
    } else if (this.Y >= 720 - 20) {
      this.Y = 720 - 20
      this.dy = -this.dy
    }
    
    this.render();
  }

  render() {
    this.Element.style.left = this.X + "px";
    this.Element.style.bottom = this.Y + "px";
  }
}