const bridgeNewGame = require('./bridge');
const bridgeRetrieveData = require('./bridge');
const AI = require('./AI');
const Player = require('./Player');
const Gameboard = require('./Gameboard');
const GeneralRender = require('./General-Render');

const Render = require('./Render');
const Ships = require('./Ships');
const Controller = require('./Controller');
const newController = require('./index');

console.log(newController);

exports.newController = newController;
exports.Controller = Controller;
exports.AI = AI;
exports.Gameboard = Gameboard;
exports.bridgeNewGame = bridgeNewGame;
exports.bridgeRetrieveData = bridgeRetrieveData;
exports.GeneralRender = GeneralRender;
exports.Render = Render;
exports.Ships = Ships;
exports.Player = Player;
