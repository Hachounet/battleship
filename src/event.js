/* eslint-disable class-methods-use-this */

const receiveInfosFromRenderEvent = require('./Controller');

class Event {
  constructor() {
    this.addEventGBP2();
  }

  addEventGBP2() {
    const GBP2 = document.getElementById('GBP2');
    GBP2.addEventListener('click', (e) => {
      console.log('clicked');
      receiveInfosFromRenderEvent(e.target.id.toString().slice(3));
    });
  }
}

module.exports = Event;
