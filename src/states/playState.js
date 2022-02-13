import { consts } from "../dependencies.js";

// Play state
export const onPlay = {
  enter: function (params) {
    this.grid = params.grid;
    this.player = params.player;
    this.ball = params.ball;
    this.brickMap = params.brickMap;

    this.bricksLeft = params.bricksLeft;

    if (this.grid.element.querySelector("#hint")) { // Removes hint message if exists
      this.grid.element.querySelector("#hint").remove();
    }
  },
  update: function (dt) {
    // Starts timer, when game starts first time
    if (!this.grid.timeCounterInterval) { 
      this.grid.startTimer();
    }

    // Resumes timer after pause or serve
    if (this.grid.timeCounterPaused) {
      this.grid.timeCounterPaused = false;
    }

    this.player.update(dt);
    this.ball.update(dt);

    // Ball collides with player
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

    // Ball collides with brick
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
          this.bricksLeft--;
          this.grid.element.removeChild(brick.element);
          brick.inPlay = false;
          window.gSounds["brick_destroy"].play();
        }

        break;
      }
    };

    if (this.bricksLeft == 0) {
      this.grid.timeCounterPaused = true;

      window.gStateMachine.change("onWin", {
        grid: this.grid,
        player: this.player,
        ball: this.ball,
      });
    }

    // Ball beyond the player
    if (this.ball.y <= 0) {
      this.grid.timeCounterPaused = true;

      window.gSounds["hurt"].play();
      this.grid.changeHealth(-1)

      if (this.grid.health == 0) {
        window.gStateMachine.change("onLost", {
          grid: this.grid,
        });
      } else {
        window.gStateMachine.change("onServe", {
          grid: this.grid,
          player: this.player,
          ball: this.ball,
          brickMap: this.brickMap,
          bricksLeft: this.bricksLeft,
        });
      }
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
        bricksLeft: this.bricksLeft,
      });
    }
  },
  render: function () {
    this.player.render();
    this.ball.render();
    this.grid.render();

    this.brickMap.forEach(brick => {
      brick.render();
    });
  }
}