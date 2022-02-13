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

    this.score = 0;
    this.health = consts.START_HEALTH;

    // Timer element
    this.totalSeconds = 0;
    this.timeCounterPaused = true;
    this.timeCounterInterval = null;
  }

  changeHealth(health) { // Adds or removes health
    this.health += health;
  }

  changeScore(score) { // Adds or removes score
    this.score += score;
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

  render() {
    this.scoreElement.innerHTML = this.score;
    this.healthElement.innerHTML = this.health;
  }
}