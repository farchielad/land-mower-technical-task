const CARDINAL_DIRECTIONS = ['N', 'E', 'S', 'W'];

class LawnMower {
  constructor(coordinates, cardinalDirection, lawn) {
    // The position of the mower can be represented by coordinates (x,y)
    this.xPosition = coordinates[0];
    this.yPosition = coordinates[1];
    this.cardinalDirection = cardinalDirection;
    this.horizontalBoundary = lawn[0];
    this.verticalBoundary = lawn[1];
  }

  _rotateLandMower90DegreesToDirection(direction) {
    let directionIndex = CARDINAL_DIRECTIONS.indexOf(this.direction);
    if (direction === 'left')
        return (directionIndex > 0)
            ? CARDINAL_DIRECTIONS[directionIndex - 1]
            : CARDINAL_DIRECTIONS[CARDINAL_DIRECTIONS.length - 1];
    if (direction === 'right')
        return (directionIndex === CARDINAL_DIRECTIONS.length - 1)
            ? CARDINAL_DIRECTIONS[0]
            : CARDINAL_DIRECTIONS[directionIndex + 1];
  }

  rotateLandMower90DegreesLeft() {
    this.direction = this._rotateLandMower90DegreesToDirection('left');
  }
  
  rotateLandMower90DegreesRight() {
    this.direction = this._rotateLandMower90DegreesToDirection('right');
  }

  _validateIfForwardMoveIsNotOutOfBound(x, y) {
    return x >= 0 && x <= this.horizontalBoundary && y >= 0 && y <= this.verticalBoundary;
  }
  
  // getter - the get syntax binds an object property to a function that will be called when that property is looked up
  get landMowerPosition() {
    return `${this.xPosition} ${this.yPosition} ${this.cardinalDirection}`;
  }

  advanceLandMowerForwardOneStep() {
      // advance mower forward one position based on its' current direction
    switch(this.direction) {
      case 'N':
        if (this._validateIfForwardMoveIsNotOutOfBound(this.xPosition, this.yPosition + 1)) { this.yPosition += 1 };
        break;
      case 'E':
        if (this._validateIfForwardMoveIsNotOutOfBound(this.xPosition + 1, this.yPosition)) { this.xPosition += 1 };
        break;
      case 'S':
        if (this._validateIfForwardMoveIsNotOutOfBound(this.xPosition, this.yPosition - 1)) { this.yPosition -= 1 };
        break;
      case 'W':
        if (this._validateIfForwardMoveIsNotOutOfBound(this.xPosition - 1, this.yPosition)) { this.xPosition -= 1 };
        break;
    }
  }
}

class MowerController {
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

const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, '../sampleData.txt'), 'utf8').split("\n");
// first row in the file represents the lawn as a matrix, represented as width and height
const lawn = data[0].split(' ').map(character => parseInt(character));

// the rest of the rows in the data input file will represent the mower initial position and the mower moving instructions
// in such order that rows in odd places represent the initial position (x coordinate, y coordinate, cardinal direction)
// and even rows represent a sequence. The mower is controlled by a sequence of letters. Possible letters are L,R, F
// L and R make the mower rotate of 90° respectively to the right or to the left, without moving.
// F means that the mower is moving forward on the cell in front of it, without changing its orientation.
let currentRowInDataFile = 1;
while (currentRowInDataFile < data.length) {
  // extract from data file mower initial position and direction    
  const initialMowerPositionRepresentedAsString = data[currentRowInDataFile].split(' ');
  const initialXPositionAsInt = parseInt(initialMowerPositionRepresentedAsString[0]);
  const initialYPositionAsInt = parseInt(initialMowerPositionRepresentedAsString[1]);
  const initialMowerPositionAsIntArray = [initialXPositionAsInt, initialYPositionAsInt];
  const mowerInitialDirection = initialMowerPositionRepresentedAsString[2];
  
  // initialize a new lawn mower - assuming once the mower is done performing a sequence it is removed from the lawn
  const lawnMower = new LawnMower(initialMowerPositionAsIntArray, mowerInitialDirection, lawn);
  
  // initialize a new mowerController - will move our mower instance
  const mowerController = new MowerController(lawnMower);
  
  // the subsequent row after currentRowInDataFile should always represent the orientation and moving sequence
  const mowerOrientationAndForwardingSequence = data[currentRowInDataFile + 1].split('');
  mowerController.executeMovementAndOrientationSequence(mowerOrientationAndForwardingSequence);
  console.log(lawnMower.landMowerPosition);
  currentRowInDataFile += 2;
}