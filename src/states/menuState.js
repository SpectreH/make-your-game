import { Grid, consts } from "../dependencies.js";

// Menu state
export const onMenu = {
  enter: function (params) {
    this.currentPage = 0; // main-page or scoreboard
    this.selected = 1;

    // Clears all old elements (if exists)
    this.grid = new Grid(consts.GRID_WIDTH, consts.GRID_HEIGHT);
    while (this.grid.element.firstChild) {
      this.grid.element.removeChild(this.grid.element.firstChild);
    }

    this.grid.topBarElement.style.display = "none";

    this.mainMenuElement = document.getElementById("main-menu").cloneNode(true);
    this.mainMenuElement.style.height = consts.GRID_HEIGHT + "px";
    this.mainMenuElement.classList.remove("hide");

    this.grid.element.appendChild(this.mainMenuElement)
  },
  update: function () {
    this.currentSelectedElement = this.mainMenuElement.querySelector(`#menu-${this.selected}`);
    if (!this.currentSelectedElement.classList.contains("selected")) {
      this.currentSelectedElement.classList.add("selected");
    }

    if (window.keyPresses.s) { // Go down
      window.keyPresses.s = false
      if (this.selected < consts.MAIN_MENU_ELEMENTS) {
        this.currentSelectedElement.classList.remove("selected");
        this.selected++;
      }
    } else if (window.keyPresses.w) { // Go up
      window.keyPresses.w = false
      if (this.selected > 1) {
        this.currentSelectedElement.classList.remove("selected");
        this.selected--;
      }
    }

    if (window.keyPresses.Enter) {
      window.keyPresses.enter = false

      switch (this.selected) {
        case 1:
          window.gStateMachine.change("onStart", {});
          break;
      }
    }
  },
  render: function () {

  }
}