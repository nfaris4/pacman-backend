import ConfigGame from "./ConfigGameClass.js";
import GamePacman from "./classes/GamePacman.js";

let wallImg;
let pacmanImgs = {};
let game;

const sketch = (p) => {
  p.preload = () => {
    wallImg = p.loadImage("/src/game/assets/wall.png");
    pacmanImgs = {
      up: p.loadImage("/src/game/assets/pacUp.png"),
      down: p.loadImage("/src/game/assets/pacDown.png"),
      left: p.loadImage("/src/game/assets/pacLeft.png"),
      right: p.loadImage("/src/game/assets/pacRight.png"),
    };
  };

  p.setup = () => {
    const config = new ConfigGame();
    p.createCanvas(config.getWidth(), config.getHeight());
    game = new GamePacman(p, config, wallImg, pacmanImgs);
  };

  p.draw = () => {
    p.background(0);
    if (game) {
      game.update();
      game.render();
    }
  };
};

export default sketch;
