const Gameboard = require('../src/Gameboard');

test('it should see if gameboard is correctly created with adjacencyList', () => {
  const gameBoardTest = new Gameboard();
  expect(gameBoardTest).toHaveProperty('missedLogs');
  expect(gameBoardTest).toHaveProperty('shipsLogs');
  expect(gameBoardTest).toHaveProperty('adjacencyList');
});

test('addVertex() in gameBoard should create a new Set into an object in adjacency List ', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.addVertex(1);
  expect(gameBoardTest.adjacencyList).toHaveProperty('1', {
    neighbors: new Set(),
    slot: null,
  });
});

test('populateGraph() in Gameboard sould create a new graph from A1 to J10 ', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.populateGraph();
  const size = Object.keys(gameBoardTest.adjacencyList).length;
  expect(size).toBe(100);
});

test('addEdge() in Gameboard should populate specific vertex and create mutual relations', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.populateGraph();
  gameBoardTest.addEdge('A1', 'A2');
  expect(gameBoardTest.adjacencyList['A1'].neighbors).toContain('A2');
});

test('populateEdge() in Gameboard should populate all vertex with corrects neighbors', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.populateGraph();
  gameBoardTest.populateEdge();
  expect(gameBoardTest.adjacencyList['A1'].neighbors).toContain('A2', 'B1');
  expect(gameBoardTest.adjacencyList['E4'].neighbors).toContain(
    'D4',
    'E3',
    'F4',
    'E5'
  );
});

test('placeShip() in gameboard should place a ship inside a adjacencyList element into his slot property', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.populateGraph();
  gameBoardTest.populateEdge();
  gameBoardTest.placeShip('A1', 1);
  expect(gameBoardTest.adjacencyList['A1'].slot).toMatchObject({
    hitNumb: 0,
    length: 1,
    sunk: false,
  });
});

test('placeShip() in Gameboard with a ship.length > 1 should populate graph into col free slots', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.populateGraph();
  gameBoardTest.populateEdge();
  gameBoardTest.placeShip('A1', 3, 'col');
  expect(gameBoardTest.adjacencyList['A1'].slot).toMatchObject({
    hitNumb: 0,
    length: 3,
    sunk: false,
  });
  expect(gameBoardTest.adjacencyList['B1'].slot).toMatchObject({
    hitNumb: 0,
    length: 3,
    sunk: false,
  });
  expect(gameBoardTest.adjacencyList['C1'].slot).toMatchObject({
    hitNumb: 0,
    length: 3,
    sunk: false,
  });
});

test('placeShip() should not place ship outer bonds into col/row free slots and should throw Error to abort', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.populateGraph();
  gameBoardTest.populateEdge();
  expect(() => {
    gameBoardTest.placeShip('J10', 3, 'row');
  }).toThrow(Error);
  expect(() => {
    gameBoardTest.placeShip('J10', 3, 'col');
  }).toThrow(Error);
});

test('receiveAttack() in Gameboard should take a pair of coordinate, see if it hit something and send hit to correct ship or record the missed shot', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.populateGraph();
  gameBoardTest.populateEdge();
  gameBoardTest.placeShip('A1', 1);
  expect(gameBoardTest.receiveAttack('A1')).toBe(true);
  expect(gameBoardTest.receiveAttack('A2')).toBe(false);
  expect(gameBoardTest.missedLogs).toContain('A2');
});

test('allSunk() in Gameboard should see if shipsLogs is empty. If it is, it should return true', () => {
  const gameBoardTest = new Gameboard();
  gameBoardTest.populateGraph();
  gameBoardTest.populateEdge();
  gameBoardTest.placeShip('A1', 1);
  gameBoardTest.receiveAttack('A1');
  expect(gameBoardTest.allSunk()).toBe(true);
});
