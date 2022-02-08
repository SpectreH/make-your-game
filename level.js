// Grid class
export class Grid {
  constructor(w, h) {
    this.Width = w;
    this.Height = h;

    this.Element = document.querySelector(".grid");
    this.Element.style.width = this.Width + "px";
    this.Element.style.height = this.Height + "px";
  }
}

// Ball class
export class Ball {
  constructor(w, h, xStartPos, yStartPos) {
    this.Width = w;
    this.Height = h;
    this.X = xStartPos;
    this.Y = yStartPos;
    this.dx = Math.random() * (200 - -200) + -200;;
    this.dy = Math.random() * (-60 - -50) + -50;;

    this.Element = document.createElement("div");
    this.Element.style.width = this.Width + "px";
    this.Element.style.height = this.Height + "px";
    this.Element.style.left = this.X + "px";
    this.Element.style.bottom = this.Y + "px";
  }

  update(dt) {

  }
}