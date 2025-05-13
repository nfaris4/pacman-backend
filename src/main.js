import p5 from "p5";
import GamePacman from "./game/classes/GamePacman.js";
import ConfigGame from "./game/classes/ConfigGameClass.js";
import wallImgSrc from "./assets/wall.png";
import pacmanRight from "./assets/pacmanRight.png";
import pacmanLeft from "./assets/pacmanLeft.png";
import pacmanUp from "./assets/pacmanUp.png";
import pacmanDown from "./assets/pacmanDown.png";

// Carrega les imatges necessàries
const wallImg = new Image();
wallImg.src = wallImgSrc;

const pacmanImgs = {
  right: new Image(),
  left: new Image(),
  up: new Image(),
  down: new Image(),
};
pacmanImgs.right.src = pacmanRight;
pacmanImgs.left.src = pacmanLeft;
pacmanImgs.up.src = pacmanUp;
pacmanImgs.down.src = pacmanDown;

let sketch = null;

// Event listener per començar el joc
document.getElementById("startBtn").addEventListener("click", () => {
  const selectedMap = parseInt(document.getElementById("mapSelector").value);
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("hud").classList.remove("hidden");

  const config = new ConfigGame(selectedMap);

  sketch = new p5((p) => {
    let game;

    p.setup = () => {
      p.createCanvas(config.getWidth(), config.getHeight());
      game = new GamePacman(p, config, wallImg, pacmanImgs);
    };

    p.draw = () => {
      p.background(0);
      game.update();
      game.render();

      // Actualitza els missatges del HUD fora del canvas
      document.getElementById("livesText").textContent = game.getLives();
      document.getElementById("timeText").textContent = `${game.getTimeLeft()}s`;
      document.getElementById("pointsText").textContent = game.pointsCollected;
    };
  });
});