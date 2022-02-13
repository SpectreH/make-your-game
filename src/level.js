import { consts, pad } from "./dependencies.js";

// Grid class
export class Grid {
  constructor(w, h) {
    this.width = w;
    this.height = h;

    this.element = document.querySelector(".grid");
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";

    // Top-bar section
    this.topBarElement = document.querySelector(".top-bar");
    this.scoreElement = document.querySelector("#score");
    this.healthElement = document.querySelector("#health");
    this.secondsElement = document.querySelector("#seconds");
    this.minutesElement = document.querySelector("#minutes");

    // Score and health elements
    this.scoreElement.innerHTML = 0;
    this.healthElement.innerHTML = consts.START_HEALTH;

    // Timer element
    this.totalSeconds = 0;
    this.timeCounterPaused = true;
    this.timeCounterInterval = null;
  }

  changeHealth(health) { // Adds or removes health
    this.healthElement.innerHTML = parseInt(this.healthElement.innerHTML, 10) + health;
  }

  changeScore(score) { // Adds or removes score
    this.scoreElement.innerHTML = parseInt(this.scoreElement.innerHTML, 10) + score;
  }

  startTimer() { // Starts timer
    this.timeCounterPaused = false;
    this.timeCounterInterval = setInterval(this.setTime.bind(this), 1000);
  }
  
  clearTimer() { // Resets timer
    clearInterval(this.timeCounterInterval);
    this.timeCounterInterval = null;

    this.totalSeconds = 0;
    this.secondsElement.innerHTML = pad(this.totalSeconds % 60);
    this.minutesElement.innerHTML = pad(parseInt(this.totalSeconds / 60));
    this.timeCounterPaused = true;
  }

  setTime() { // Updates timer
    if (!this.timeCounterPaused) {
      this.totalSeconds++;
      this.minutesElement.innerHTML = pad(parseInt(this.totalSeconds / 60));
      this.secondsElement.innerHTML = pad(this.totalSeconds % 60);
    }
  }
}