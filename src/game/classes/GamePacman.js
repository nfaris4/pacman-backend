import Pacman from "./pacman.js";
import Food from "./food.js";
import Wall from "./wall.js";
import { levels } from "../constants.js";

export default class GamePacman {
  #p;
  #config;
  #pacman;
  #foods = [];
  #walls = [];
  #wallImg;
  #pacmanImgs;
  #lives;
  #gameOver = false;
  #win = false;

  constructor(p, config, wallImg, pacmanImgs) {
    this.#p = p;
    this.#config = config;
    this.#wallImg = wallImg;
    this.#pacmanImgs = pacmanImgs;
    this.#lives = this.#config.getLives();
    this.levelIndex = 0;
    this.levelData = levels[this.levelIndex];
    this.timeLeft = this.levelData.timeLimit;
    this.pointsCollected = 0;

    this.#initMap();
  }

  getLives() {
    return this.#lives;
  }

  getTimeLeft() {
    return Math.max(0, this.timeLeft); // o com calculis el temps restant
  }

  #initMap() {
    const cellSize = this.#config.getCellSize();
    const mapData = this.#config.getMap();

    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        const value = mapData[y][x];
        if (value === 1) {
          this.#walls.push(new Wall(this.#p, x, y, cellSize, this.#wallImg));
        } else if (value === 2) {
          this.#foods.push(new Food(this.#p, x, y, cellSize));
        }
      }
    }

    // Iniciar Pacman on hi ha un 0
    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        if (mapData[y][x] === 0) {
          this.#pacman = new Pacman(
            this.#p,
            x,
            y,
            cellSize,
            this.#config.getCols(),
            this.#config.getRows(),
            this.#pacmanImgs,
            mapData
          );
          return;
        }
      }
    }
  }
  #isWallAt(xCell, yCell) {
    const map = this.#config.getMap();
    return map[yCell]?.[xCell] === 1;
  }
  update() {
    if (!this.#pacman || this.#gameOver || this.#win) return;

    const nextX = this.#pacman.getXCellFromNextMove();
    const nextY = this.#pacman.getYCellFromNextMove();

    // Evitem moure si hi ha paret
    if (!this.#isWallAt(nextX, nextY)) {
      this.#pacman.update();
    }

    // Menjar
    this.#foods = this.#foods.filter((food) => !food.isEaten(this.#pacman));
    this.pointsCollected = levels[this.levelIndex].pointsToWin - this.#foods.length;

    if (this.#foods.length === 0) {
      this.#win = true;
    }

    // Reduir el temps cada segon
    if (this.#p.frameCount % 60 === 0 && this.timeLeft > 0) {
      this.timeLeft--;
    }

    if (this.timeLeft === 0) {
      this.#lives--;
      if (this.#lives <= 0) this.#gameOver = true;
      else this.nextLevel();
    }
  }

  render() {
    this.#walls.forEach((wall) => wall.draw());
    this.#foods.forEach((food) => food.draw());
    if (this.#pacman) this.#pacman.draw();
    
    // Missatges de fi de joc
    if (this.#gameOver || this.#win) {
      this.#p.fill(255, 0, 0);
      this.#p.textSize(60);
      this.#p.textAlign(this.#p.CENTER, this.#p.CENTER);
      this.#p.text(
        this.#win ? "YOU WIN!" : "GAME OVER",
        this.#p.width / 2,
        this.#p.height / 2
      );
      const message = this.#win ? "YOU WIN!" : "GAME OVER";
      document.getElementById("game-message").textContent = message;
      document.getElementById("game-message").classList.remove("hidden");
    }
  }

  nextLevel() {
    this.levelIndex++;
    if (this.levelIndex >= levels.length) {
      this.#win = true;
    } else {
      this.levelData = levels[this.levelIndex];
      this.pointsCollected = 0;
      this.timeLeft = this.levelData.timeLimit;

      this.#foods = [];
      this.#walls = [];
      this.#config.map = this.levelData.map;

      this.#initMap(); // Torna a generar el mapa
    }
  }
}
