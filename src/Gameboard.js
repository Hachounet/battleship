/* eslint-disable no-console */
const Ships = require('./Ships');

class Gameboard {
  constructor(missedLogs = null, shipsLogs = []) {
    this.missedLogs = missedLogs;
    this.shipsLogs = shipsLogs;
    this.adjacencyList = {};
    this.populateGraph();
    this.populateEdge();
    this.populateShips();
  }

  populateShips() {
    this.placeShip('A1', 2, 'col');
    this.placeShip('D1', 3, 'row');
    this.placeShip('G1', 4, 'col');
    this.placeShip('A3', 4, 'row');
    this.placeShip('A8', 2, 'col');
    this.placeShip('F3', 3, 'col');
    this.placeShip('J3', 2, 'row');
    this.placeShip('F6', 3, 'row');
    this.placeShip('J6', 3, 'row');
    this.placeShip('E10', 6, 'col');
  }

  placeShip(coord, length, rowOrCol) {
    const newShip = new Ships(length, 0);
    const colStr = coord.slice(0, 1);
    const rowStr = coord.slice(1);

    if (length > 1) {
      if (rowOrCol === 'row') {
        for (let i = length - 1; i > 0; i -= 1) {
          if (
            this.adjacencyList[
              colStr.concat(Number(Number(rowStr) + i).toString())
            ] === undefined
          ) {
            throw new Error('Cannot be outer bounds');
          } else {
            this.adjacencyList[
              colStr.concat(Number(Number(rowStr) + i).toString())
            ].slot = newShip;
          }
        }
      }
      if (rowOrCol === 'col') {
        for (let i = length - 1; i > 0; i -= 1) {
          if (
            this.adjacencyList[
              String.fromCharCode(colStr.charCodeAt() + i).concat(
                rowStr.toString()
              )
            ] === undefined
          ) {
            throw new Error('Invalid position, cannot be outer bounds.');
          } else {
            this.adjacencyList[
              String.fromCharCode(colStr.charCodeAt() + i).concat(
                rowStr.toString()
              )
            ].slot = newShip;
          }
        }
      }
    }
    this.adjacencyList[coord].slot = newShip;
    this.shipsLogs.push(newShip);
  }

  receiveAttack(coord) {
    let result;
    if (
      this.adjacencyList[coord].slot !== null &&
      this.adjacencyList[coord].slot !== 'touched'
    ) {
      this.adjacencyList[coord].slot.hitFn();

      if (this.adjacencyList[coord].slot.sunkFn() === true) {
        const shipIndex = this.shipsLogs.findIndex(
          (item) => item.sunk === true
        );

        this.shipsLogs.splice(shipIndex, 1);

        this.adjacencyList[coord].slot = 'touched';
        result = 'SUNK';
        return result;
      }
      this.adjacencyList[coord].slot = 'touched';
      result = true;
    } else {
      this.missedLogs = new Set().add(coord);
      result = false;
      this.adjacencyList[coord].slot = 'Wtouched';
      return result;
    }
    return result;
  }

  allSunk() {
    if (this.shipsLogs.length === 0) {
      return true;
    }
    return false;
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = { neighbors: new Set(), slot: null };
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      return "This vertex1 doesn't exists";
    }
    if (!this.adjacencyList[vertex2]) {
      return "This vertex2 doesn't exists";
    }
    this.adjacencyList[vertex1].neighbors.add(vertex2);
    this.adjacencyList[vertex2].neighbors.add(vertex1);
    return true;
  }

  populateGraph() {
    for (let i = 65; i < 75; i += 1) {
      for (let j = 1; j < 11; j += 1) {
        const toLetter = String.fromCharCode(i);
        const concat = toLetter.concat(j.toString());
        this.addVertex(concat);
      }
    }
  }

  populateEdge() {
    const array = Object.keys(this.adjacencyList);
    array.forEach((key) => {
      const colStr = key.slice(0, 1);
      const rowStr = key.slice(1);

      const nextCol = String.fromCharCode(colStr.charCodeAt() + 1);
      const nextRow = (Number(rowStr) + 1).toString();

      const concatNextCol = nextCol.concat(rowStr);
      const concatNextRow = colStr.concat(nextRow);

      this.addEdge(key, concatNextCol);
      this.addEdge(key, concatNextRow);
    });
  }
}

module.exports = Gameboard;
