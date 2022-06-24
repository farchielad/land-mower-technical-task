const CARDINAL_DIRECTIONS = ['N', 'E', 'S', 'W'];

export default class LawnMower {
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