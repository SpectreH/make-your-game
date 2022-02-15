import { Grid, consts } from "../dependencies.js";
import { Scoreboard } from "../scoreboard.js";

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
    if (this.currentPage == 0) {
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
        window.keyPresses.Enter = false
        this.swithState();
      }
    } else {
      this.scoreboard.update();
      this.scoreboard.render();

      if (window.keyPresses.Escape) {
        if (this.scoreboardElement) {
          this.grid.element.removeChild(this.scoreboardElement);
        }
        this.mainMenuElement.classList.remove("hide");
        this.currentPage = 0;
      }
    }
  },
  render: function () {
  },
  swithState: async function ()  {
    switch (this.selected) {
      case 1:
        window.gStateMachine.change("onStart", {});
        break;
      case 3:
        this.currentPage++;
        this.mainMenuElement.classList.add("hide");
        this.scoreboardElement = document.getElementById("scoreboard").cloneNode(true);
        
        this.scoreboard = await Scoreboard.create(this.scoreboardElement);

        this.scoreboardElement.classList.remove("hide");
        this.scoreboardElement.style.height = consts.GRID_HEIGHT + "px";
        this.grid.element.appendChild(this.scoreboardElement);
        break;
    }
  },
}