// Player class
export class Player {
  constructor(w, h, xStartPos, yStartPos) {
    this.Speed = 5;
    this.Width = w;
    this.Height = h;
    this.X = xStartPos;
    this.Y = yStartPos;
    this.dx = 0;

    this.Element = document.createElement("div");
    this.Element.style.width = this.Width + "px";
    this.Element.style.height = this.Height + "px";
    this.Element.style.left = this.X + "px";
    this.Element.style.bottom = this.Y + "px";
  }

  update(keyPresses, gridWidth, dt) {
    if (keyPresses.a) {
      this.dx = -this.Speed;
    } else if (keyPresses.d) {
      this.dx = this.Speed;
    } else {
      this.dx = 0;
    }

    if (this.dx < 0) {
      this.X = Math.max(0, this.X + this.dx * dt);
    } else {
      this.X = Math.min(gridWidth - this.Width, this.X + this.dx * dt);
    }

    this.render();
  }

  render() {
    this.Element.style.left = this.X + "px"; 
  }
}

