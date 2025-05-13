export default class Pacman {
  #p;
  #xCell;
  #yCell;
  #startXCell;
  #startYCell;
  #cellSize;
  #cols;
  #rows;
  #imgs;
  #dir = "right";
  #map;
  #moveCooldown = 10; // frames entre moviments
  #frameCounter = 0;

  constructor(p, xCell, yCell, cellSize, cols, rows, imgs, map) {
    this.#p = p;
    this.#xCell = xCell;
    this.#yCell = yCell;
    this.#startXCell = xCell;
    this.#startYCell = yCell;
    this.#cellSize = cellSize;
    this.#cols = cols;
    this.#rows = rows;
    this.#imgs = imgs;
    this.#map = map;

    this.#setupInput();
  }

  #setupInput() {
    this.#p.keyPressed = () => {
      switch (this.#p.keyCode) {
        case this.#p.UP_ARROW:
          if (this.#canMoveTo(this.#xCell, this.#yCell - 1)) this.#dir = "up";
          break;
        case this.#p.DOWN_ARROW:
          if (this.#canMoveTo(this.#xCell, this.#yCell + 1)) this.#dir = "down";
          break;
        case this.#p.LEFT_ARROW:
          if (this.#canMoveTo(this.#xCell - 1, this.#yCell)) this.#dir = "left";
          break;
        case this.#p.RIGHT_ARROW:
          if (this.#canMoveTo(this.#xCell + 1, this.#yCell)) this.#dir = "right";
          break;
      }
    };
  }

  #canMoveTo(x, y) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < this.#cols &&
      y < this.#rows &&
      this.#map[y][x] !== 1
    );
  }

  update() {
    this.#frameCounter++;
    if (this.#frameCounter < this.#moveCooldown) return;
    this.#frameCounter = 0;

    let newX = this.#xCell;
    let newY = this.#yCell;

    switch (this.#dir) {
      case "up": newY--; break;
      case "down": newY++; break;
      case "left": newX--; break;
      case "right": newX++; break;
    }

    if (this.#canMoveTo(newX, newY)) {
      this.#xCell = newX;
      this.#yCell = newY;
    }
  }

  draw() {
    const x = this.#xCell * this.#cellSize;
    const y = this.#yCell * this.#cellSize;
    const img = this.#imgs[this.#dir];
    this.#p.image(img, x, y, this.#cellSize, this.#cellSize);
  }

  getXCellFromNextMove() {
    let x = this.#xCell;
    if (this.#dir === "left") x--;
    if (this.#dir === "right") x++;
    return x;
  }

  getYCellFromNextMove() {
    let y = this.#yCell;
    if (this.#dir === "up") y--;
    if (this.#dir === "down") y++;
    return y;
  }

  getXCell() {
    return this.#xCell;
  }

  getYCell() {
    return this.#yCell;
  }


  resetPosition() {
    this.#xCell = this.#startXCell;
    this.#yCell = this.#startYCell;
    this.#dir = "right";
  }

  getCurrentMapCell() {
    return [this.#xCell, this.#yCell];
  }

  getCurrentMapValue() {
    return this.#map[this.#yCell][this.#xCell];
  }
}
