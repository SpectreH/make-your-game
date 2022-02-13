import { consts } from "../dependencies.js";

// Lost state
export const onLost = {
  enter: function (params) {
    this.selected = 1;
    this.params = params;

    // Clears all elements
    while (this.params.grid.element.firstChild) {
      this.params.grid.element.removeChild(this.params.grid.element.firstChild);
    }

    this.lostMenuElement = document.getElementById("lost-menu").cloneNode(true);
    this.lostMenuElement.style.height = consts.GRID_HEIGHT + "px";
    this.lostMenuElement.classList.remove("hide");

    this.lostMenuElement.querySelector("#score-lost-menu").innerHTML += params.grid.score;
    this.lostMenuElement.querySelector("#time-lost-menu").innerHTML += `${params.grid.minutesElement.innerHTML}:${params.grid.secondsElement.innerHTML}`;

    this.params.grid.element.appendChild(this.lostMenuElement)
    window.keyPresses = {};
  },
  update: function () {
    this.currentSelectedElement = this.lostMenuElement.querySelector(`#menu-${this.selected}`);
    if (!this.currentSelectedElement.classList.contains("selected")) {
      this.currentSelectedElement.classList.add("selected");
    }

    if (window.keyPresses.s) {
      window.keyPresses.s = false
      if (this.selected < consts.LOST_MENU_ELEMENTS) {
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
      window.keyPresses = {};

      switch (this.selected) {
        case 1:
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