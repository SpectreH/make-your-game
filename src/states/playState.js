import { consts } from "../dependencies.js";

// Play state
export const onPlay = {
  enter: function (params) {
    this.grid = params.grid;
    this.player = params.player;
    this.ball = params.ball;
    this.brickMap = params.brickMap;

    if (this.grid.element.querySelector("#hint")) {
      this.grid.element.querySelector("#hint").remove();
    }
  },
  update: function (dt) {
    if (!this.grid.timeCounterInterval) {
      this.grid.startTimer();
    }

    if (this.grid.timeCounterPaused) {
      this.grid.timeCounterPaused = false;
    }

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
      this.grid.timeCounterPaused = true;

      window.gSounds["hurt"].play();
      this.grid.changeHealth(-1)

      window.gStateMachine.change("onServe", {
        grid: this.grid,
        player: this.player,
        ball: this.ball,
        brickMap: this.brickMap,
      });
    }

    if (window.keyPresses.p) {
      window.keyPresses.p = false;
      this.grid.timeCounterPaused = true;

      window.gStateMachine.change("onPause", {
        prevState: "onPlay",
        grid: this.grid,
        player: this.player,
        ball: this.ball,
        brickMap: this.brickMap,
      });
    }
  },
  render: function () {
    this.player.render();
    this.ball.render();

    this.brickMap.forEach(brick => {
      brick.render();
    });
  }
}