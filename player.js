// Player class
export class Player {
  constructor(w, h, xStartPos, yStartPos) {
    this.speed = 5;
    this.width = w;
    this.height = h;
    this.x = xStartPos;
    this.y = yStartPos;
    this.dx = 0;

    this.element = document.createElement("img");
    this.element.setAttribute("src", "./img/paddle.png")
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";
  }

  update(keyPresses, gridWidth, dt) {
    if (keyPresses.a) {
      this.dx = -this.speed;
    } else if (keyPresses.d) {
      this.dx = this.speed;
    } else {
      this.dx = 0;
    }

    if (this.dx < 0) {
      this.x = Math.max(0, this.x + this.dx * dt);
    } else {
      this.x = Math.min(gridWidth - this.width, this.x + this.dx * dt);
    }

    this.render();
  }

  render() {
    this.element.style.left = this.x + "px"; 
  }
}

