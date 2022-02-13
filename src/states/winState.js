import { consts, createMap } from "../dependencies.js";

// Win state
export const onWin = {
  enter: function (params) {
    this.selected = 1;
    this.params = params

    this.winMenuElement = document.createElement("div");
    this.congratulationElement = document.createElement("div");
    this.totalScoreElement = document.createElement("div");
    this.totalTimeElement = document.createElement("div");
    this.continueElement = document.createElement("div");

    this.winMenuElement.classList.add("win-menu");
    this.winMenuElement.style.height = consts.GRID_HEIGHT + "px";

    this.continueElement.setAttribute("id", "menu-1");

    this.congratulationText = document.createElement("h1");
    this.totalScoreText = document.createElement("p");
    this.totalTimeText = document.createElement("p");
    this.continueText = document.createElement("p");

    this.congratulationText.classList.add("text");
    this.totalScoreText.classList.add("text");
    this.totalTimeText.classList.add("text");
    this.continueText.classList.add("text");

    this.congratulationText.innerHTML = "You Win!";
    this.totalScoreText.innerHTML = `Your total score: ${params.grid.scoreElement.innerHTML}`;
    this.totalTimeText.innerHTML = `Your time: ${params.grid.minutesElement.innerHTML}:${params.grid.secondsElement.innerHTML}`;
    this.continueText.innerHTML = "Continue";

    this.congratulationElement.appendChild(this.congratulationText);
    this.totalScoreElement.appendChild(this.totalScoreText)
    this.totalTimeElement.appendChild(this.totalTimeText);
    this.continueElement.appendChild(this.continueText);

    this.winMenuElement.appendChild(this.congratulationElement)
    this.winMenuElement.appendChild(this.totalScoreElement)
    this.winMenuElement.appendChild(this.totalTimeElement)
    this.winMenuElement.appendChild(this.continueElement)

    this.params.grid.element.appendChild(this.winMenuElement)

    if (this.params.grid.element.querySelector("#hint")) { // Removes hint message if exists
      this.params.grid.element.querySelector("#hint").remove();
    }
  },
  update: function () {
    this.currentSelectedElement = this.winMenuElement.querySelector(`#menu-${this.selected}`);
    if (!this.currentSelectedElement.classList.contains("selected")) {
      this.currentSelectedElement.classList.add("selected");
    }
    
    if (window.keyPresses.Enter) {
      window.keyPresses = {};

      this.brickMap = createMap();
      // Appends new bricks to the grid
      this.brickMap.forEach(brick => {
        brick.element.classList.add("brick");
        this.params.grid.element.appendChild(brick.element);
      });

      this.params.grid.element.removeChild(this.winMenuElement);

      window.gStateMachine.change("onServe", {
        grid: this.params.grid,
        player: this.params.player,
        ball: this.params.ball,
        brickMap: this.brickMap,
      });
    }
  },
  render: function () {

  }
}