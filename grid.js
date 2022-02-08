// Grid class
export class Grid {
  constructor(w, h) {
    this.Width = w;
    this.Height = h;
    this.Element = document.querySelector(".grid")

    this.Element.style.width = this.Width + "px";
    this.Element.style.height = this.Height + "px";
  }
}