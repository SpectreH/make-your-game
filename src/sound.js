// Sound class
export class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.volume = 0.5;

    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }
  play() {
    this.stop();
    this.sound.play();
  }
  stop() {
    this.sound.pause();
    this.sound.currentTime = 0;
  }
}