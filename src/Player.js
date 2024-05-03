const Gameboard = require('./internal');
const AI = require('./internal');

class Player {
  constructor(player) {
    this.Gameboard = new Gameboard();
    this.player = player;
    this.winner = false;
    this.gamemode = false;
    this.switchAI();
  }

  switchAI() {
    if (this.player === 'AI') {
      this.gamemode = new AI();
    } else {
      this.gamemode = false;
    }
  }
}

module.exports = Player;
