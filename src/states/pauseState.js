import { Grid, consts } from "../dependencies.js";

// Pause state
export const onPause = {
  enter: function (params) {
    this.selected = 1;
    this.params = params

    this.pauseMenuElement = document.getElementById("pause-menu").cloneNode(true);
    this.pauseMenuElement.style.height = consts.GRID_HEIGHT + "px";
    this.pauseMenuElement.classList.remove("hide");

    this.params.grid.element.appendChild(this.pauseMenuElement)

    if (this.params.grid.element.querySelector("#hint")) { // Removes hint message if exists
      this.params.grid.element.querySelector("#hint").remove();
    }
  },
  update: function () {
    this.currentSelectedElement = this.pauseMenuElement.querySelector(`#menu-${this.selected}`);
    if (!this.currentSelectedElement.classList.contains("selected")) {
      this.currentSelectedElement.classList.add("selected");
    }

    if (window.keyPresses.s) {
      window.keyPresses.s = false
      if (this.selected < consts.PAUSE_MENU_ELEMENTS) {
        this.currentSelectedElement.classList.remove("selected");
        this.selected++;
      }
    } else if (window.keyPresses.w) {
      window.keyPresses.w = false
      if (this.selected > 1) {
        this.currentSelectedElement.classList.remove("selected");
        this.selected--;
      }
    }

    if (window.keyPresses.Enter) {
      window.keyPresses.Enter = false;
      window.keyPresses.p = false;

      switch (this.selected) {
        case 1:
          this.params.grid.element.removeChild(this.pauseMenuElement);

          window.gStateMachine.change(this.params.prevState, {
            grid: this.params.grid,
            player: this.params.player,
            ball: this.params.ball,
            brickMap: this.params.brickMap,
          });
          break;
        case 2:
          window.gStateMachine.change("onStart", {});
          break;
        case 3:
          window.gStateMachine.change("onMenu", {});
          break;
      }
    }
  },
  render: function () {

  }
}