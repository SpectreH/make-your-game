import { consts } from "./dependencies.js";

// Scoreboard class
export class Scoreboard {
  constructor(scoreboardElement) {
    this.scoreboardElement = scoreboardElement;
    this.prevPageArrow = this.scoreboardElement.querySelector("#scoreboard-prev")
    this.nextPageArrow = this.scoreboardElement.querySelector("#scoreboard-next")
    this.currentPage = 1;
  }
  async initialize() {
    this.players = await this.getScoreboard();
    this.changeScoreboardPage(1);

    this.maxPages = Math.ceil(this.players.length / consts.MAX_PLAYERS_AT_PAGE)
  }
  static async create(scoreboardElement) {
    const o = new Scoreboard(scoreboardElement);
    await o.initialize();
    return o;
  }
  async getScoreboard() {
    const response = await fetch('http://localhost:8080/get-scoreboard');

    // Sort players by their score
    let players = await response.json();
    players.sort(function (a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });

    // Add for each player ranking
    players.forEach((player, i) => {
      player["rank"] = i + 1;
    });

    return players;
  }
  changeScoreboardPage() {
    this.tableElement = this.scoreboardElement.querySelector("#scoreboard-table")
    this.tbodyElement = this.tableElement.querySelector("tbody")
    while (this.tbodyElement.children.length != 1) {
      this.tbodyElement.removeChild(this.tbodyElement.lastChild);
    }

    // Show certain players at current page
    this.players.slice(((this.currentPage - 1) * consts.MAX_PLAYERS_AT_PAGE), (this.currentPage * consts.MAX_PLAYERS_AT_PAGE)).forEach(player => {
      let newRow = this.tableElement.insertRow();

      ["rank", "name", "score", "levels", "time"].forEach((element) => {
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(player[element]);
        newCell.appendChild(newText);
      })
    });
  }
  updateArrows() {
    this.currentPage == 1 ? this.prevPageArrow.style.visibility = "hidden" : this.prevPageArrow.style.visibility = "visible"
    this.currentPage == this.maxPages ? this.nextPageArrow.style.visibility = "hidden" : this.nextPageArrow.style.visibility = "visible"
  }
  update() {
    if (window.keyPresses.a) {
      window.keyPresses.a = false;
      if (this.currentPage > 1) {
        this.currentPage--;
        this.changeScoreboardPage()
        this.updateArrows()
      }
    } else if (window.keyPresses.d) {
      window.keyPresses.d = false;
      if (this.currentPage < this.maxPages) {
        this.currentPage++;
        this.changeScoreboardPage()
        this.updateArrows()
      }
    }
  }
  render() {
    this.scoreboardElement.querySelector("#scoreboard-pagination-current").innerHTML = this.currentPage;
    this.scoreboardElement.querySelector("#scoreboard-pagination-max").innerHTML = this.maxPages;
  }
}