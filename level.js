// Grid class
export class Grid {
  constructor(w, h) {
    this.width = w;
    this.height = h;

    this.element = document.querySelector(".grid");
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  }
}