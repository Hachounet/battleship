/* eslint-disable class-methods-use-this */

const newController = require('./internal');

function publishData(data) {
  newController.newController.receiveAttackPos(data);
}

function bridgeRetrieveData(data) {
  publishData(data);
}

function bridgeNewGame() {
  console.log(newController);
  // eslint-disable-next-line no-const-assign
  const nop = new Controller();
  console.log(nop);
}

module.exports.bridgeRetrieveData = bridgeRetrieveData;
module.exports.bridgeNewGame = bridgeNewGame;
