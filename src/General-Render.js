/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

/* This Class generate the general rendering of the Battleship game. Order of constructor is import : 
First we get ships keys from Players, then we generate PlayerParts and create gameboard for each players, then we generate ships position and gameboards.
*/

class GeneralRender {
  constructor(p1keys, p2keys) {
    console.log(`i am into construcotr ${p1keys}`);
    this.P1keys = Object.keys(p1keys);
    this.P2Keys = Object.keys(p2keys);
    this.body = document.querySelector('body');
    this.generatePlayerParts();

    this.leftPart = document.getElementById('left-part');
    this.rightPart = document.getElementById('right-part');
    this.generateInputsPlayers();
    this.createGBDiv();
    this.GBDivP1 = document.getElementById('GBP1');
    this.GBDivP2 = document.getElementById('GBP2');
    this.generateGB1();
    this.generateGB2();
    this.generateMenuPart();
    this.menuPart = document.getElementById('menu-part');
    this.generateMessageBox();
    this.generateMenuOptions();
  }

  changeMessage(message) {
    const messageDiv = document.getElementById('message-div');
    messageDiv.textContent = message;
  }

  createGBDiv() {
    const GBDivP1 = document.createElement('div');
    const GBDivP2 = document.createElement('div');
    GBDivP1.id = 'GBP1';
    GBDivP2.id = 'GBP2';

    this.leftPart.append(GBDivP1);
    this.rightPart.append(GBDivP2);
  }

  sortArray(array) {
    let firstItem = array[0];
    let previousFirst = 0;
    const newArray = [];
    newArray.push(firstItem);

    while (firstItem !== 'J10') {
      const index = array.indexOf(firstItem) + 10;
      firstItem = array.at(index);
      if (firstItem === undefined) {
        previousFirst += 1;
        firstItem = array[previousFirst];
        newArray.push(firstItem);
      } else {
        firstItem = array.at(index);
        newArray.push(firstItem);
      }
    }

    return newArray;
  }

  generateGB1() {
    console.log(this.P1keys);
    const array1 = this.sortArray(this.P1keys);
    array1.forEach((key) => {
      const div = document.createElement('div');
      div.classList.add('cells');
      div.id = 'GB1'.concat(key);
      this.GBDivP1.append(div);
    });
  }

  generateGB2() {
    const { GBDivP2 } = this;

    const GB2 = GBDivP2;
    const array2 = this.sortArray(this.P2Keys);

    array2.forEach((key) => {
      const div = document.createElement('div');
      div.classList.add('cells');
      div.id = 'GB2'.concat(key);
      GB2.append(div);
    });
  }

  generatePlayerParts() {
    const leftPart = document.createElement('div');
    const rightPart = document.createElement('div');
    leftPart.id = 'left-part';
    rightPart.id = 'right-part';
    leftPart.classList.add('player-parts');
    rightPart.classList.add('player-parts');
    this.body.append(leftPart, rightPart);
  }

  generateInputsPlayers() {
    const P1Name = document.createElement('input');
    this.leftPart.append(P1Name);

    const P2Name = document.createElement('input');
    this.rightPart.append(P2Name);
  }

  generateMenuPart() {
    const menuPart = document.createElement('div');
    menuPart.id = 'menu-part';
    this.body.append(menuPart);
  }

  generateMessageBox() {
    const messageDiv = document.createElement('div');
    messageDiv.id = 'message-div';
    const message = document.createElement('p');
    message.textContent = 'This is a test';
    messageDiv.append(message);
    this.menuPart.append(messageDiv);
  }

  generateMenuOptions() {
    const menuOptionsDiv = document.createElement('div');
    menuOptionsDiv.id = 'menu-options';
    const AIOrPlayer = document.createElement('button');
    AIOrPlayer.textContent = 'AI/Player Opponent';
    const start = document.createElement('button');
    start.textContent = 'Launch game';

    menuOptionsDiv.append(AIOrPlayer, start);
    this.menuPart.append(menuOptionsDiv);
  }
}

module.exports = GeneralRender;
