// Player class
export class Player {
  constructor(w, h, xStartPos, yStartPos) {
    this.speed = 5;
    this.width = w;
    this.height = h;
    this.x = xStartPos;
    this.y = yStartPos;
    this.dx = 0;

    this.element = document.createElement("div");

    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.element.style.backgroundImage = 'url("./img/tileset.png")';
    this.element.style.backgroundPositionY = "-80px";
  }

  update(gridWidth, dt) {
    if (window.keyPresses.a) {
      this.dx = -this.speed;
    } else if (window.keyPresses.d) {
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

