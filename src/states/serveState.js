// Server state
export const onServe = {
  enter: function (params) {
    this.grid = params.grid;
    this.player = params.player;
    this.ball = params.ball;
    this.brickMap = params.brickMap
  },
  update: function (dt) {
    this.ball.x = this.player.x + (this.player.width / 2)
    this.ball.y = this.player.y + this.player.height
    this.player.update(dt)

    if (window.keyPresses.w) {
      window.keyPresses.w = false;

      window.gStateMachine.change("onPlay", {
        grid: this.grid,
        player: this.player,
        ball: this.ball,
        brickMap: this.brickMap,
      })
    }
  },
  render: function () {
    this.player.render();
    this.ball.render();
  }
}