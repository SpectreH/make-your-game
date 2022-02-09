export const onPlay = {  // Play state
  enter: function (params) {
    this.grid = params.grid;
    this.player = params.player;
    this.ball = params.ball;

    this.paused = false;
  },
  update: function (dt) {
    if (!this.paused) {
      this.player.update(this.grid.width, dt);
      this.ball.update(dt);

      if (this.ball.collides(this.player)) {
        this.ball.y = this.player.y + this.ball.height
        this.ball.dy = -this.ball.dy

        if (this.ball.x < this.player.x + (this.player.width / 2) && this.player.dx < 0) {
          this.ball.dx = -5 + -(0.1 * (this.player.x + this.player.width / 2 - this.ball.x))
        } else if (this.ball.x > this.player.x + (this.player.width / 2) && this.player.dx > 0) {
          this.ball.dx = 5 + (0.1 * Math.abs(this.player.x + this.player.width / 2 - this.ball.x))
        } else {
          this.ball.dx = Math.random() * (7 - -7) + -7;
        }
      }

      if (this.ball.y <= 0) {
        window.stateMachine.change("onStart", {})
      }
    }

    window.keyPresses.p ? this.paused = true : this.paused = false;
    this.draw();
  },
  draw: function () {
    window.devConsole.querySelector(".player-x").innerHTML = "Player X: " + this.player.x;
    window.devConsole.querySelector(".player-y").innerHTML = "Player Y: " + this.player.y;
    window.devConsole.querySelector(".player-w").innerHTML = "Player Width: " + this.player.width;
    window.devConsole.querySelector(".player-h").innerHTML = "Player Height: " + this.player.height;
    window.devConsole.querySelector(".player-dx").innerHTML = "Player dx: " + this.player.dx;
    window.devConsole.querySelector(".ball-dx").innerHTML = "Ball dx: " + this.ball.dx;
    window.devConsole.querySelector(".ball-dy").innerHTML = "Ball dy: " + this.ball.dy;
  }
}