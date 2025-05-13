export default class Wall {
    #p;
    #x;
    #y;
    #size;
    #img;
  
    constructor(p, x, y, size, img) {
      this.#p = p;
      this.#x = x;
      this.#y = y;
      this.#size = size;
      this.#img = img;
    }
  
    draw() {
      this.#p.image(
        this.#img,
        this.#x * this.#size,
        this.#y * this.#size,
        this.#size,
        this.#size
      );
    }
  }
  