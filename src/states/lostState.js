import { consts, Scoreboard } from "../dependencies.js";

// Lost state
export const onLost = {
  enter: function (params) {
    this.currentPage = 0;
    this.selected = 1;
    this.params = params;

    // Clears all elements
    while (this.params.grid.element.firstChild) {
      this.params.grid.element.removeChild(this.params.grid.element.firstChild);
    }

    this.fullMenuElement = document.createElement("div");
    this.fullMenuElement.setAttribute("id", "full-close-menu"); 
    this.fullMenuElement.classList.add("hide");

    this.lostMenuElement = document.getElementById("lost-menu").cloneNode(true);
    this.lostMenuElement.style.height = consts.GRID_HEIGHT + "px";
    this.lostMenuElement.classList.remove("hide");

    this.lostMenuElement.querySelector("#score-lost-menu").innerHTML += params.grid.score;
    this.lostMenuElement.querySelector("#time-lost-menu").innerHTML += `${params.grid.minutesElement.innerHTML}:${params.grid.secondsElement.innerHTML}`;

    this.fullMenuElement.appendChild(this.lostMenuElement)

    this.params.grid.element.appendChild(this.fullMenuElement)
    window.keyPresses = {};
  },
  update: function () {
    if (this.currentPage == 0) {
      // Checks if scoreboard is created, if not - creates and shows full menu
      if (!this.fullMenuElement.querySelector("#scoreboard")) {
        this.createScoreboard();
      } else {  
        this.scoreboard.update();
        this.scoreboard.render();
      }

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
            // Prevents double save score
            if (this.scoreboard.newPlayerName) {
              break;
            }
           
            this.currentPage++;
            this.fullMenuElement.classList.add("hide");

            this.scoreboardInputElement = document.getElementById("scoreboard-name-input").cloneNode(true);
            this.scoreboardInputElement.style.height = consts.GRID_HEIGHT + "px";
            this.nameInput = this.scoreboardInputElement.querySelector("#name-input")

            this.scoreboardInputElement.classList.remove("hide");

            // Make input element always in focus
            this.alwaysFocusFunc = function (e) {
              this.nameInput.focus();
            }.bind(this);

            this.nameInput.addEventListener("blur", this.alwaysFocusFunc);

            this.params.grid.element.appendChild(this.scoreboardInputElement)
            this.nameInput.focus();
            break;
          case 2:
            window.gStateMachine.change("onStart", {});
            break;
          case 3:
            window.gStateMachine.change("onMenu", {});
            break;
        }
      }
    } else {
      if (window.keyPresses.Enter || window.keyPresses.Escape) {
        // If it's ented, disables button and sends post request with new player
        if (window.keyPresses.Enter) {
          this.updateScoreboard();
          this.lostMenuElement.querySelector("#menu-1").classList.add("disabled");
        }

        window.keyPresses = {};
        this.currentPage = 0;

        // Removes infinite input focus
        this.nameInput.removeEventListener("blur", this.alwaysFocusFunc)
        this.nameInput.blur();

        this.scoreboardInputElement.remove();
        this.fullMenuElement.classList.remove("hide");
      }
    }
  },
  render: function () {
  },
  createScoreboard: async function () { // Creates new scoreboard and shows full menu
    this.scoreboardElement = document.getElementById("scoreboard").cloneNode(true);
    this.scoreboard = await Scoreboard.create(this.scoreboardElement);

    this.scoreboardElement.classList.remove("hide");
    this.fullMenuElement.classList.remove("hide");
    this.fullMenuElement.appendChild(this.scoreboardElement);
  }, 
  updateScoreboard: async function () { // Updates scoreboard
    const newPlayer = {
      name: this.nameInput.value,
      score: this.params.grid.score,
      levels: this.params.grid.level,
      time: `${this.params.grid.minutesElement.innerHTML}:${this.params.grid.secondsElement.innerHTML}`,
      createdAt: Date.now(),
    }

    await this.scoreboard.postScoreboard(newPlayer);
  }
}