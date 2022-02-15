import { consts, createMap } from "../dependencies.js";

// Win state
export const onWin = {
  enter: function (params) {
    this.selected = 1;
    this.params = params

    this.winMenuElement = document.getElementById("win-menu").cloneNode(true);
    this.winMenuElement.style.height = consts.GRID_HEIGHT + "px";
    this.winMenuElement.classList.remove("hide");

    this.winMenuElement.querySelector("#score-win-menu").innerHTML += params.grid.score;
    this.winMenuElement.querySelector("#time-win-menu").innerHTML += `${params.grid.minutesElement.innerHTML}:${params.grid.secondsElement.innerHTML}`;

    this.params.grid.element.appendChild(this.winMenuElement)
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
      this.params.grid.level++;

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