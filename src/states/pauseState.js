import { Grid, consts } from "../dependencies.js";

// Pause state
export const onPause = {
  enter: function (params) {
    this.selected = 1;
    this.params = params

    this.pauseMenuElement = document.createElement("div"); 
    this.continueElement = document.createElement("div");
    this.restartElement = document.createElement("div"); 
    this.exitElement = document.createElement("div"); 

    this.pauseMenuElement.classList.add("pause-menu");
    this.pauseMenuElement.style.height = consts.GRID_HEIGHT + "px";

    this.continueElement.setAttribute("id", "menu-1");
    this.restartElement.setAttribute("id", "menu-2")
    this.exitElement.setAttribute("id", "menu-3");

    this.continueText = document.createElement("p");
    this.restartText = document.createElement("p");
    this.exitText = document.createElement("p");

    this.continueText.classList.add("text");
    this.restartText.classList.add("text");
    this.exitText.classList.add("text");

    this.continueText.innerHTML = "Continue";
    this.restartText.innerHTML = "Restart";
    this.exitText.innerHTML = "Exit";

    this.continueElement.appendChild(this.continueText);
    this.restartElement.appendChild(this.restartText)
    this.exitElement.appendChild(this.exitText);

    this.pauseMenuElement.appendChild(this.continueElement)
    this.pauseMenuElement.appendChild(this.restartElement)
    this.pauseMenuElement.appendChild(this.exitElement)

    this.params.grid.element.appendChild(this.pauseMenuElement)

    if (this.params.grid.element.querySelector("#hint")) {
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