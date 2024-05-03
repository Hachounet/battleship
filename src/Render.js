/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const { bridgeRetrieveData } = require('./internal');

class Render {
  constructor(
    p1entries,
    p2entries,
    p1missedLogs,
    p2missedLogs,
    playerTurn,
    addEvent
  ) {
    this.p1entries = p1entries;
    this.p2entries = p2entries;
    this.p1missedLogs = p1missedLogs;
    this.p2missedLogs = p2missedLogs;
    this.playerTurn = playerTurn;
    this.addEvent = addEvent;

    this.renderBattlefield(this.p1entries, this.p2entries);
    this.checkBeforeAddEvent();
  }

  checkBeforeAddEvent() {
    if (this.addEvent === true) {
      this.addEventGBP2();
    }
  }

  endRender() {
    console.log('zboub');
    const cells = document.querySelectorAll('.cells');
    cells.forEach((cell) => {
      cell.classList.remove('empty', 'ships', 'touched', 'w-touched');
      cell.classList.add('finished');
    });
  }

  addEventGBP2() {
    const GBP2 = document.getElementById('GBP2');
    GBP2.addEventListener('click', (event) => {
      console.log(`clicked on ${event.target.id.toString().slice(3)}`);
      bridgeRetrieveData(event.target.id.toString().slice(3));
    });
  }

  renderBattlefield(p1entries, p2entries) {
    const entries = p1entries;
    const entries2 = p2entries;

    entries.forEach((array) => {
      const { slot } = array[1];
      const cellID = array[0];
      const cell = document.getElementById('GB1'.concat(cellID));
      if (slot === null) {
        cell.classList.add('empty');
      } else {
        cell.classList.add('ships');
      }
      if (this.p1missedLogs.has(cellID)) {
        cell.classList.add('w-touched');
      } else if (array[1].status === 'Stouched') {
        cell.classList.add('touched');
      }
    });

    entries2.forEach((array) => {
      const cellID = array[0];
      const cell = document.getElementById('GB2'.concat(cellID));
      cell.classList.add('empty');

      if (this.p2missedLogs.has(cellID)) {
        cell.classList.add('w-touched');
      } else if (array[1].status === 'Stouched') {
        cell.classList.add('touched');
      }
    });
    // Old render part for opponent. Should be REWORKED
    /* entries2.forEach((array) => {
      const { slot } = array[1];

      if (slot === null) {
        const cellID = array[0];
        const cell = document.getElementById('GB2'.concat(cellID));
        cell.classList.add('empty');
      } else if (slot === 'touched') {
        const cellID = array[0];
        console.log(cellID);
        const cell = document.getElementById('GB2'.concat(cellID));
        cell.classList.add('touched');
      } else {
        const cellID = array[0];
        const cell = document.getElementById('GB2'.concat(cellID));
        cell.classList.add('ships');
      }
    }); */
  }
}

module.exports = Render;
