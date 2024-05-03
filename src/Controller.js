/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

const GeneralRender = require('./internal');
const Player = require('./internal');
const Render = require('./internal');

class Controller {
  constructor(playerTurn = 'Player 1') {
    this.playerTurn = playerTurn;
    this.player1 = new Player('Player 1');
    console.log(this.player1);
    this.player2 = new Player('AI');
    this.p1keys = this.player1.Gameboard.adjacencyList;
    this.p2keys = this.player2.Gameboard.adjacencyList;
    this.p1entries = Object.entries(this.player1.Gameboard.adjacencyList);
    this.p2entries = Object.entries(this.player2.Gameboard.adjacencyList);
    this.GRender = new GeneralRender(this.p1keys, this.p2keys);
    this.render = new Render(
      this.p1entries,
      this.p2entries,
      this.player1.Gameboard.missedLogs,
      this.player2.Gameboard.missedLogs,
      this.playerTurn,
      true
    );
  }

  switchTurn() {
    this.playerTurn = this.playerTurn === 'Player 1' ? 'AI' : 'Player 1';
  }

  callGeneralRenderCellStatus() {
    this.GRender.messageInfos();
  }

  callGeneralRenderSwitchTurnMsg(result) {
    if (result === true) {
      result = "You've hit something !";
    }
    if (result === false) {
      result = 'Deep in water, Captain !';
    }
    if (result === 'SUNK') {
      result = ' We got one ! For democracy !';
    }
    this.GRender.changeMessage(result);
  }

  receiveAttackPos(infos) {
    if (this.playerTurn === 'Player 1') {
      const result = this.player2.Gameboard.receiveAttack(infos);
      this.callGeneralRenderSwitchTurnMsg(result);
      this.endOfTurn();
    }
    if (this.playerTurn === 'AI') {
      const result = this.player1.Gameboard.receiveAttack(infos);
      console.log(this.player2.gamemode.lastResult);
      this.player2.gamemode.lastResult = result;
      this.endOfTurn();
    }
  }

  generateNewRender() {
    console.log('????');
    this.render = null;
    this.render = new Render(
      this.p1entries,
      this.p2entries,
      this.player1.Gameboard.missedLogs,
      this.player2.Gameboard.missedLogs,
      this.playerTurn,
      false
    );
  }

  endOfTurn() {
    this.generateNewRender();
    if (this.endOfGame() === false) {
      this.switchTurn();
      if (this.playerTurn === 'AI') {
        this.makeAIPlay();
      }
    }
  }

  makeAIPlay() {
    const coord = this.player2.gamemode.logic();
    this.receiveAttackPos(coord);
  }

  endOfGame() {
    let result = false;
    if (this.player1.Gameboard.allSunk()) {
      this.GRender.changeMessage(`${this.playerTurn} have win !`);

      this.callRenderToEnd();
      result = true;
      return result;
    }
    if (this.player2.Gameboard.allSunk()) {
      this.GRender.changeMessage(`${this.playerTurn} have win !`);

      this.callRenderToEnd();
      result = true;
      return result;
    }
    return result;
  }

  callRenderToEnd() {
    this.generateNewRender();
    console.log('blabla');
    this.render.endRender();
  }
}

module.exports = Controller;
