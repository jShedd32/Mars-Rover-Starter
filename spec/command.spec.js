const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  it("Constructor sets command type", function(){
    let modeChange = new Command('MODE_CHANGE');
    expect(modeChange.commandType).toEqual('MODE_CHANGE')
  });

  it("constructor sets a value passed in as the 2nd argument", function(){
    let lowPower = new Command('MODE_CHANGE','LOW_POWER')
    expect(lowPower.value).toEqual('LOW_POWER')
  });


});