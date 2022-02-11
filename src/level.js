import { consts } from "./dependencies.js";

// Grid class
export class Grid {
  constructor(w, h) {
    this.width = w;
    this.height = h;

    this.element = document.querySelector(".grid");
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";

    this.score = document.querySelector(".score");
    this.health = document.querySelector(".health");

    this.score.innerHTML = 0;
    this.health.innerHTML = consts.START_HEALTH;
  }

  changeHealth(health) {
    this.health.innerHTML = parseInt(this.health.innerHTML, 10) + health;
  }

  changeScore(score) {
    this.score.innerHTML = parseInt(this.score.innerHTML, 10) + score;
  }
}