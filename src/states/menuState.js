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
    
    this.mainMenuElement = document.createElement("div"); // page id = 0
    this.newGameElement = document.createElement("div"); 
    this.campaignElement = document.createElement("div"); 
    this.scoreBoardElement = document.createElement("div"); // page id = 1

    this.mainMenuElement.classList.add("main-menu");
    this.mainMenuElement.style.height = consts.GRID_HEIGHT + "px";

    this.newGameElement.setAttribute("id", "menu-1");
    this.campaignElement.setAttribute("id", "menu-2");
    this.scoreBoardElement.setAttribute("id", "menu-3");

    this.newGameText = document.createElement("p");
    this.newCampaignText = document.createElement("p");
    this.scoreBoardText = document.createElement("p");

    this.newGameText.classList.add("text");
    this.newCampaignText.classList.add("text");
    this.scoreBoardText.classList.add("text");

    this.newGameText.innerHTML = "New Game";
    this.newCampaignText.innerHTML = "Campaign";
    this.scoreBoardText.innerHTML = "Scoreboard";

    this.newGameElement.appendChild(this.newGameText);
    this.campaignElement.appendChild(this.newCampaignText);
    this.scoreBoardElement.appendChild(this.scoreBoardText);

    this.mainMenuElement.appendChild(this.newGameElement)
    this.mainMenuElement.appendChild(this.campaignElement)
    this.mainMenuElement.appendChild(this.scoreBoardElement)

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
      }
    }
  },
  render: function () {

  }
}