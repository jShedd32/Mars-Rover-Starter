const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {// 7 tests here!

  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(98382);
  expect(rover.position).toEqual(98382);
  expect(rover.mode).toEqual('NORMAL');
  expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains the name of the message", function(){
    let rover = new Rover(98382);
    let message = new Message('Test message with two commands')
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message with two commands');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2)
  });

  it("responds correctly to the status check command", function(){
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({
      completed: true,
      roverStatus: {
        mode: rover.mode,
        generatorWatts: rover.generatorWatts,
        position: rover.position,
      },
    });
  });

  it("responds correctly to the mode change command", function (){
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK'), 
          new Command ('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[3].roverStatus.mode).toEqual('NORMAL');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function (){
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command ('MOVE', 14258)];
    let message = new Message('Test message', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
    expect(rover.position).toEqual(98382);
  });

  it("responds with the position for the move command",function(){
    const rover = new Rover(98382);
    const commands = [new Command('MOVE', 14258)];
    const message = new Message('Test Message', commands);
    rover.receiveMessage(message);
    expect(rover.position).toEqual(14258);
  });

});
