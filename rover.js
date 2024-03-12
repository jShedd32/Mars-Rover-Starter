const Command = require("./command");
const Message = require("./message")

class Rover {// Write code here!
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message){
      let results = [];

      message.commands.forEach((command) => {
         if(command.commandType === "MOVE"){
            if (this.mode === "NORMAL") {
               this.position = command.value;
               results.push({ completed: true });
             } else {
                  results.push({ completed: false });
             }
         }

         else if(command.commandType === "MODE_CHANGE"){
            this.mode = command.value;
            results.push({ completed: true});
         }
         
         else if(command.commandType === "STATUS_CHECK"){
            results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               },
            });
         } else {
            results.push({ completed: false, reason: "unkown command"});
         }

      });
         return {
            message : message.name,
            results : results
         };

   }   
}

module.exports = Rover;
