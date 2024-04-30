/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

class Render {
  constructor(p1entries, p2entries) {
    this.p1entries = p1entries;
    this.p2entries = p2entries;
    this.renderBattlefield(this.p1entries, this.p2entries);
  }

  renderBattlefield(p1entries, p2entries) {
    const entries = p1entries;
    const entries2 = p2entries;

    entries.forEach((array) => {
      const { slot } = array[1];

      if (slot === null) {
        const cellID = array[0];
        const cell = document.getElementById('GB1'.concat(cellID));
        cell.classList.add('empty');
      } else {
        const cellID = array[0];
        const cell = document.getElementById('GB1'.concat(cellID));
        cell.classList.add('ships');
      }
    });

    entries2.forEach((array) => {
      const { slot } = array[1];
      const cellID = array[0];
      const cell = document.getElementById('GB2'.concat(cellID));
      cell.classList.add('empty');
      if (slot === 'touched') {
        cell.classList.add('touched');
      }
      if (slot === 'Wtouched') {
        cell.classList.add('w-touched');
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
