import { configGame } from "./constants.js";

export default class ConfigGame {
  #rows;
  #cols;
  #cellSize;
  #speed;
  #lives;
  #map;

  constructor() {
    this.#rows = configGame.ROWS;
    this.#cols = configGame.COLUMNS;
    this.#cellSize = configGame.IMAGE_SIZE;
    this.#speed = configGame.SPEED_PACMAN;
    this.#lives = configGame.LIVES_PACMAN;
    this.#map = configGame.map;
  }

  getWidth() {
    return this.#cols * this.#cellSize;
  }

  getHeight() {
    return this.#rows * this.#cellSize;
  }

  getRows() {
    return this.#rows;
  }

  getCols() {
    return this.#cols;
  }

  getCellSize() {
    return this.#cellSize;
  }

  getSpeed() {
    return this.#speed;
  }

  getLives() {
    return this.#lives;
  }

  getMap() {
    return this.#map;
  }
}
