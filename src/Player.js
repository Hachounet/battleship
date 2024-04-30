const Gameboard = require('./Gameboard');

class Player {
  constructor(player) {
    this.Gameboard = new Gameboard();
    this.player = player;
    this.winner = false;
  }
}

module.exports = Player;
