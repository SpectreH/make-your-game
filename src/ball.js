import { randomIntInRange, consts } from "./dependencies.js";

// Ball class
export class Ball {
  constructor(w, h, xStartPos, yStartPos) {
    this.width = w;
    this.height = h;
    this.x = xStartPos;
    this.y = yStartPos;
    this.dx = randomIntInRange(consts.BALL_MIN_START_DX, consts.BALL_MAX_START_DX); // sets random start x velocity
    this.dy = randomIntInRange(consts.BALL_MIN_START_DY, consts.BALL_MAX_START_DY); // sets random start y velocity

    this.element = document.createElement("div");

    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.element.style.backgroundImage = consts.TILESET_TEXTURE_PATH;

    this.tileID = randomIntInRange(0, consts.BALL_COLORS) // random between 0-5
    this.element.style.backgroundSize = consts.TILESET_WIDTH + "px";
    this.element.style.backgroundPositionX = window.gFrames["Balls"][this.tileID].x  + "px"; 
    this.element.style.backgroundPositionY = window.gFrames["Balls"][this.tileID].y  + "px"; 
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

    if (this.x <= 0) { // left edge
      this.x = 0
      this.dx = -this.dx
      window.gSounds["wall_hit"].play();
    } else if (this.x >= 1280 - this.width) {  // right edge
      this.x = 1280 - this.width
      this.dx = -this.dx
      window.gSounds["wall_hit"].play();
    } else if (this.y >= 720 - this.width) {  // top edge
      this.y = 720 - this.width
      this.dy = -this.dy
      window.gSounds["wall_hit"].play();
    }
  }

  render() {
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";
  }
}