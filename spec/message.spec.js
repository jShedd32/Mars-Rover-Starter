const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter",function(){
        expect(function() {new Message()}).toThrow(new Error('Name is required.'))
    });

    it("constructor sets name", function(){
        let testMessage = new Message('Test message with two commands');
        expect(testMessage.name).toEqual('Test message with two commands')
    });
    it("contains a commands array passed into the constructor as the 2nd argument", function(){
        let commandsArray = new Message('Test message with two commands', commands = [])
        expect(commandsArray.commands).toEqual(commands = [])
    });
    
});
