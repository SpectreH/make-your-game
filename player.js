// Player class
export class Player {
  constructor(h, w, xStartPos, yStartPos) {
    this.Speed = 2;
    this.Height = h;
    this.Width = w;
    this.X = xStartPos;
    this.Y = yStartPos;
    this.Element = document.createElement("div");

    this.Element.style.left = this.X + "px";
    this.Element.style.bottom = this.Y + "px";
  }
}
