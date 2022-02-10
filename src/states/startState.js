import { Ball, Player, Grid, consts, createMap } from "../dependencies.js";

// Start state
export const onStart = {
  enter: function (params) {
    this.grid = new Grid(consts.GRID_WIDTH, consts.GRID_HEIGHT);
    while (this.grid.element.firstChild) {
      this.grid.element.removeChild(this.grid.element.firstChild);
    }

    this.player = new Player(consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT, consts.PLAYER_SPAWN_X, consts.PLAYER_SPAWN_Y);
    this.ball = new Ball(consts.BALL_WIDTH, consts.BALL_HEIGHT, consts.BALL_SPAWN_X, consts.BALL_SPAWN_Y);
    this.level = createMap()

    // Appends player to the grid
    this.player.element.classList.add("player");
    this.grid.element.appendChild(this.player.element);

    // Appends ball to the grid
    this.ball.element.classList.add("ball");
    this.grid.element.appendChild(this.ball.element);

    // Appends bricks to the grid
    this.level.forEach(Brick => {
      Brick.element.classList.add("brick");
      this.grid.element.appendChild(Brick.element);
    });

  },
  update: function (dt) {
    window.stateMachine.change("onPlay", {
      grid: this.grid,
      player: this.player,
      ball: this.ball
    })
  },
}