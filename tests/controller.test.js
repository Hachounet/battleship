const Controller = require('../src/Controller');

test('callGenerateRenderSwitchTurnMsg() in Controller should send a msg as string ', () => {
  // TODO
  const controller = new Controller();
  expect(controller.callGeneralRenderSwitchTurnMsg()).toSend(
    controller.playerTurn
  );
});
