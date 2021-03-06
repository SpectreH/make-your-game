import { consts } from "../dependencies.js";

// Server state
export const onServe = {
  enter: function (params) {
    this.grid = params.grid;
    this.player = params.player;
    this.ball = params.ball;
    this.brickMap = params.brickMap;
    this.bricksLeft = params.bricksLeft || this.brickMap.length;

    // Hint message
    this.hintMessageElement = document.querySelector("#hint").cloneNode(true);
    this.hintMessageElement.style.height = consts.GRID_HEIGHT + "px";
    this.hintMessageElement.classList.remove("hide");
    this.grid.element.appendChild(this.hintMessageElement);
  },
  update: function (dt) {
    this.ball.x = this.player.x + (this.player.width / 2) - (this.ball.width / 2);
    this.ball.y = this.player.y + this.player.height;
    this.player.update(dt);

    if (window.keyPresses.w) {
      window.keyPresses.w = false;

      window.gStateMachine.change("onPlay", {
        grid: this.grid,
        player: this.player,
        ball: this.ball,
        brickMap: this.brickMap,
        bricksLeft: this.bricksLeft,
      });
    }

    if (window.keyPresses.p) {
      window.keyPresses.p = false;

      window.gStateMachine.change("onPause", {
        prevState: "onServe",
        grid: this.grid,
        player: this.player,
        ball: this.ball,
        brickMap: this.brickMap,
        bricksLeft: this.bricksLeft,
      });
    }
  },
  render: function () {
    this.player.render();
    this.ball.render();
    this.grid.render();
  }
}