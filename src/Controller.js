/* eslint-disable class-methods-use-this */

const GeneralRender = require('./General-Render');
const Player = require('./Player');
const Render = require('./Render');
const Event = require('./event');

class Controller {
  constructor(playerTurn = 'Player 1') {
    this.playerTurn = playerTurn;
    this.player1 = new Player('Player 1');
    this.player2 = new Player('AI');
    this.p1keys = this.player1.Gameboard.adjacencyList;
    this.p2keys = this.player2.Gameboard.adjacencyList;
    this.p1entries = Object.entries(this.player1.Gameboard.adjacencyList);
    this.p2entries = Object.entries(this.player2.Gameboard.adjacencyList);
    this.GRender = new GeneralRender(this.p1keys, this.p2keys);
    this.render = new Render(this.p1entries, this.p2entries);
    this.Event = new Event();
    this.addEventApp();

    this.callGeneralRenderSwitchTurnMsg();
  }

  addEventApp() {
    const GBP2 = document.getElementById('GBP2');
    const GBP1 = document.getElementById('GBP1');
    GBP2.addEventListener('click', () => {
      this.switchTurn();
      this.callGeneralRenderSwitchTurnMsg();
    });
    GBP1.addEventListener('click', () => {});
  }

  switchTurn() {
    this.playerTurn = this.playerTurn === 'Player 1' ? 'AI' : 'Player 1';
  }

  callGeneralRenderCellStatus() {
    this.GRender.messageInfos();
  }

  callGeneralRenderSwitchTurnMsg() {
    this.GRender.changeMessage(`${this.playerTurn}`);
  }

  receiveInfosFromRenderEvent(infos) {
    const result = this.player2.Gameboard.receiveAttack(infos);
    console.log(result);
  }
}

module.exports = Controller;
module.exports.receiveInfosFromRenderEvent = this.receiveInfosFromRenderEvent;
