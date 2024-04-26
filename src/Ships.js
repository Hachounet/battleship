class Ships {
  constructor(length, hitNumb = 0, sunk = false) {
    (this.length = length),
      (this.hitNumb = hitNumb),
      (this.sunk = sunk),
      (this.hitFn = this.hit),
      (this.sunkFn = this.isSunk);
  }

  hit() {
    this.hitNumb += 1;
  }

  isSunk() {
    if (this.hitNumb === this.length) {
      this.sunk = true;
      return true;
    } else {
      this.sunk = false;
      return false;
    }
  }
}

module.exports = Ships;
