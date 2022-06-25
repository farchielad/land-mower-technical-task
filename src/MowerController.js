export default class MowerController {
    constructor(lawnMower) {
      this.lawnMower = lawnMower;
    }
  
    executeMovementAndOrientationSequence(mowerOrientationAndForwardingSequence) {
      mowerOrientationAndForwardingSequence.forEach((sequenceCommand) => {
        switch(sequenceCommand) {
          case 'L':
            this.lawnMower.rotateLawnMower90DegreesLeft();
            break;
          case 'R':
            this.lawnMower.rotateLawnMower90DegreesRight();
            break;
          case 'F':
            this.lawnMower.advanceLawnMowerForwardOneStep();
            break;
          default:
            console.error(`Error in function executeMovementAndOrientationSequence. ${sequenceCommand} should be one of L,R,F`);
        }
      })
    }
  };