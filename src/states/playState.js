import { consts } from "../dependencies.js";

// Play state
export const onPlay = {
  enter: function (params) {
    this.grid = params.grid;
    this.player = params.player;
    this.ball = params.ball;
    this.brickMap = params.brickMap;

    this.paused = false;
  },
  update: function (dt) {
    if (!this.grid.timeCounterInterval) {
      this.grid.startTime();
    }

    if (!this.paused) {
      this.player.update(dt);
      this.ball.update(dt);

      if (this.ball.collides(this.player)) {
        this.ball.y = this.player.y + this.player.height;
        this.ball.dy = -this.ball.dy;

        if (this.ball.x < this.player.x + (this.player.width / 2) && this.player.dx < 0) {
          this.ball.dx = -5 + -(0.1 * (this.player.x + this.player.width / 2 - this.ball.x))
        } else if (this.ball.x > this.player.x + (this.player.width / 2) && this.player.dx > 0) {
          this.ball.dx = 5 + (0.1 * Math.abs(this.player.x + this.player.width / 2 - this.ball.x))
        } else {
          this.ball.dx = Math.random() * (7 - -7) + -7;
        }

        window.gSounds["player_hit"].play();
      }

      for (let brick of this.brickMap) {
        if (this.ball.collides(brick) && brick.inPlay) {
          if (this.ball.x < brick.x && this.ball.dx > 0) { // left edge, when moves only right
            this.ball.dx = -this.ball.dx;
            this.ball.x = brick.x - this.ball.height;
          } else if (this.ball.x > brick.x + brick.width && this.ball.dx < 0) { // right edge, when moves only left
            this.ball.dx = -this.ball.dx;
            this.ball.x = brick.x - brick.width;
          } else if (this.ball.y < brick.y) { // top edge
            this.ball.dy = -this.ball.dy;
            this.ball.y = brick.y - this.ball.height;
          } else { // bottom edge
            this.ball.dy = -this.ball.dy;
            this.ball.y = brick.y + brick.height;
          }

          this.grid.changeScore((brick.tier + 1) * consts.BRICK_SCORE);

          if (brick.tier != 0) {
            brick.tier--;
            window.gSounds["brick_hit"].play();
          } else {
            this.grid.element.removeChild(brick.element);
            brick.inPlay = false;
            window.gSounds["brick_destroy"].play();
          }

          break;
        }
      };

      if (this.ball.y <= 0) {
        window.gSounds["hurt"].play();
        this.grid.changeHealth(-1)
        window.gStateMachine.change("onServe", {
          grid: this.grid,
          player: this.player,
          ball: this.ball,
          brickMap: this.brickMap,
        });
      }
    }

    if (window.keyPresses.p) {
      this.paused = true;
      this.grid.timeCounterPaused = true;
    } else {
      this.paused = false;
      this.grid.timeCounterPaused = false;
    }
  },
  render: function () {
    this.player.render();
    this.ball.render();

    this.brickMap.forEach(brick => {
      brick.render();
    });

    window.devConsole.querySelector(".player-x").innerHTML = "Player X: " + this.player.x;
    window.devConsole.querySelector(".player-y").innerHTML = "Player Y: " + this.player.y;
    window.devConsole.querySelector(".player-w").innerHTML = "Player Width: " + this.player.width;
    window.devConsole.querySelector(".player-h").innerHTML = "Player Height: " + this.player.height;
    window.devConsole.querySelector(".player-dx").innerHTML = "Player dx: " + this.player.dx;
    window.devConsole.querySelector(".ball-dx").innerHTML = "Ball dx: " + this.ball.dx;
    window.devConsole.querySelector(".ball-dy").innerHTML = "Ball dy: " + this.ball.dy;
  }
}