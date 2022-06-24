export default class MowerController {
    constructor(lawnMower) {
      this.lawnMower = lawnMower
    }
  
    executeMovementAndOrientationSequence(mowerOrientationAndForwardingSequence) {
      mowerOrientationAndForwardingSequence.forEach((sequenceCommand) => {
        switch(sequenceCommand) {
          case 'L':
            this.lawnMower.rotateLandMower90DegreesLeft();
            break;
          case 'R':
            this.lawnMower.rotateLandMower90DegreesRight();
            break;
          case 'F':
            this.lawnMower.advanceLandMowerForwardOneStep();
            break;
        }
      })
    }
  };