class Ships {
  constructor(length, hitNumb = 0, sunk = false) {
    this.length = length;
    this.hitNumb = hitNumb;
    this.sunk = sunk;
    this.hitFn = this.hit;
    this.sunkFn = this.isSunk;
    this.id = `id${Math.random().toString(16).slice(2)}`;
  }

  hit() {
    this.hitNumb += 1;
  }

  isSunk() {
    if (this.hitNumb === this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}

module.exports = Ships;
