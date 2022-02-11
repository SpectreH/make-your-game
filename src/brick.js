import { consts } from "./dependencies.js";

// Brick class
export class Brick {
  constructor(w, h, xStartPos, yStartPos, color, tier) {
    this.width = w;
    this.height = h;
    this.x = xStartPos;
    this.y = yStartPos;

    this.color = color;
    this.tier = tier;
    this.inPlay = true;

    this.element = document.createElement("div");

    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "px";

    this.element.style.backgroundImage = 'url("./img/tileset.png")';
    this.element.style.backgroundSize = consts.TILESET_WIDTH + "px";
    this.element.style.backgroundPositionX = window.gFrames["Bricks"][this.color].tier[this.tier].x  + "px";
    this.element.style.backgroundPositionY = window.gFrames["Bricks"][this.color].tier[this.tier].y  + "px";
  }

  update(dt) {
  }

  render() {
    this.element.style.backgroundPositionX = window.gFrames["Bricks"][this.color].tier[this.tier].x + "px";
    this.element.style.backgroundPositionY = window.gFrames["Bricks"][this.color].tier[this.tier].y + "px";
  }
}

