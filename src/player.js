import { randomIntInRange, consts } from "./dependencies.js";

// Player class
export class Player {
  constructor(w, h, xStartPos, yStartPos) {
    this.speed = consts.PADDLE_SPEED;
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
    this.tileID = randomIntInRange(0, consts.PADDLE_COLORS) // random between 0-3
    this.element.style.backgroundSize = consts.TILESET_WIDTH + "px";
    this.element.style.backgroundPositionY = window.gFrames["Paddles"][this.tileID].y  + "px";
  }

  update(dt) {
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
      this.x = Math.min(consts.GRID_WIDTH - this.width, this.x + this.dx * dt);
    }
  }

  render() {
    this.element.style.left = this.x + "px"; 
  }
}

