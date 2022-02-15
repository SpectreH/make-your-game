import { consts } from "./dependencies.js";

// Scoreboard class
export class Scoreboard {
  constructor(scoreboardElement) {
    this.scoreboardElement = scoreboardElement;
    this.prevPageArrow = this.scoreboardElement.querySelector("#scoreboard-prev")
    this.nextPageArrow = this.scoreboardElement.querySelector("#scoreboard-next")
    this.currentPage = 1;

    this.newPlayerName = undefined;
    this.newPlayer = undefined;
  }
  async initialize() {
    await this.getScoreboard();
    this.changeScoreboardPage();
  }
  static async create(scoreboardElement) {
    const o = new Scoreboard(scoreboardElement);
    await o.initialize();
    return o;
  }
  async getScoreboard() {
    const response = await fetch('http://localhost:8080/get-scoreboard');

    let players = await response.json();
    this.formatPlayersArray(players);
  }
  async postScoreboard(playerData) {
    const response = await fetch('http://localhost:8080/post-scoreboard', {
      method: 'POST',
      body: JSON.stringify(playerData),
    });

    this.newPlayerName = playerData.name;

    let players = await response.json();
    this.formatPlayersArray(players);
    this.changeScoreboardPage(playerData.name);

    for (let player of players) {
      if (player.name == playerData.name && player.score == playerData.score &&
        player.time == playerData.time && player.level == playerData.level) {
        this.newPlayer = player
        break;
      }
    }

    this.scoreboardTopMessage = document.getElementById("scoreboard-top-message").cloneNode(true);
    this.scoreboardTopMessage.querySelector("#scoreboard-top-message-text").innerHTML =
    `Congrats ${this.newPlayer.name}, you are in the top ${Math.round((this.newPlayer.rank / this.players.length) * 10000) / 100}%, on the ${this.newPlayer.rank} position.`;

    this.scoreboardTopMessage.classList.remove("hide");
    this.scoreboardElement.appendChild(this.scoreboardTopMessage);
  }
  async formatPlayersArray(players) {
    // Sort players by their score. If players scores equals, sort by createdAt time.
    players.sort(function (a, b) {
      return parseFloat(b.score) - parseFloat(a.score) || a.createdAt - b.createdAt;
    });

    // Add for each player ranking
    players.forEach((player, i) => {
      player["rank"] = i + 1;
    });

    this.maxPages = Math.ceil(players.length / consts.MAX_PLAYERS_AT_PAGE);
    this.players = players;
  }
  async changeScoreboardPage() {
    this.tableElement = this.scoreboardElement.querySelector("#scoreboard-table");
    this.tbodyElement = this.tableElement.querySelector("tbody");
    while (this.tbodyElement.children.length != 1) {
      this.tbodyElement.removeChild(this.tbodyElement.lastChild);
    }

    // Show certain players at current page
    this.players.slice(((this.currentPage - 1) * consts.MAX_PLAYERS_AT_PAGE), (this.currentPage * consts.MAX_PLAYERS_AT_PAGE)).forEach(player => {
      let newRow = this.tableElement.insertRow();

      if (this.newPlayerName && player.name == this.newPlayerName) {
        newRow.classList.add("scoreboard-player");
      }

      ["rank", "name", "score", "levels", "time"].forEach((element) => {
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(player[element]);
        newCell.appendChild(newText);
      })
    });
  }
  updateArrows() {
    this.currentPage == 1 ? this.prevPageArrow.style.visibility = "hidden" : this.prevPageArrow.style.visibility = "visible";
    this.currentPage == this.maxPages ? this.nextPageArrow.style.visibility = "hidden" : this.nextPageArrow.style.visibility = "visible";
  }
  update() {
    if (window.keyPresses.a) {
      window.keyPresses.a = false;
      if (this.currentPage > 1) {
        this.currentPage--;
        this.changeScoreboardPage();
        this.updateArrows();
      }
    } else if (window.keyPresses.d) {
      window.keyPresses.d = false;
      if (this.currentPage < this.maxPages) {
        this.currentPage++;
        this.changeScoreboardPage();
        this.updateArrows();
      }
    }
  }
  render() {
    this.scoreboardElement.querySelector("#scoreboard-pagination-current").innerHTML = this.currentPage;
    this.scoreboardElement.querySelector("#scoreboard-pagination-max").innerHTML = this.maxPages;
  }
}