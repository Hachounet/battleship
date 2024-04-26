const Ships = require('../src/Ships');

const shipTest = new Ships(3, 0, false);

test('should check if ship is correctly created with correct properties', () => {
  expect(shipTest).toHaveProperty('length');
  expect(shipTest).toHaveProperty('sunk');
  expect(shipTest).toHaveProperty('hitNumb');
});

test('should see if hit() increase correctly the hitNumb property', () => {
  expect(shipTest).toHaveProperty('hitNumb', 0);
  shipTest.hit();
  expect(shipTest).toHaveProperty('hitNumb', 1);
});

test('should see if isSunk() return correctly when hitNumb === length', () => {
  shipTest.hit();
  shipTest.isSunk();
  expect(shipTest.sunk).toBe(false);
  shipTest.hit();
  shipTest.isSunk();
  expect(shipTest.sunk).toBe(true);
});
