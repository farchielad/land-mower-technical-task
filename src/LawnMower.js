const CARDINAL_DIRECTIONS = ['N', 'E', 'S', 'W'];
export default class LawnMower {
  constructor(coordinates, cardinalDirection, lawn) {
    // The position of the mower can be represented by coordinates (x,y)
    this.xPosition = coordinates[0];
    this.yPosition = coordinates[1];
    this.direction = cardinalDirection;
    this.horizontalBoundary = lawn[0];
    this.verticalBoundary = lawn[1];
  }

    // getter - the get syntax binds an object property to a function that will be called when that property is looked up
  get lawnMowerPosition() {
    return `${this.xPosition} ${this.yPosition} ${this.direction}`;
  }

  _rotateLawnMower90DegreesToDirection(direction) {
    let directionIndex = CARDINAL_DIRECTIONS.indexOf(this.direction);
    if (direction === 'left')
        return (directionIndex > 0)
            ? CARDINAL_DIRECTIONS[directionIndex - 1]
            : CARDINAL_DIRECTIONS[CARDINAL_DIRECTIONS.length - 1];
    if (direction === 'right')
        return (directionIndex === (CARDINAL_DIRECTIONS.length - 1))
            ? CARDINAL_DIRECTIONS[0]
            : CARDINAL_DIRECTIONS[directionIndex + 1];

    console.error(`function _rotateLawnMower90DegreesToDirection expected direction input of left or right, but recieved ${direction}`)
  }

  rotateLawnMower90DegreesLeft() {
    this.direction = this._rotateLawnMower90DegreesToDirection('left');
  }
  
  rotateLawnMower90DegreesRight() {
    this.direction = this._rotateLawnMower90DegreesToDirection('right');
  }

  _validateIfForwardMoveIsNotOutOfBound(x, y) {
    const isValidForwardMove= x >= 0 && x <= this.horizontalBoundary && y >= 0 && y <= this.verticalBoundary
    if (!isValidForwardMove) {
        console.error(`${x},${y} is an out of bound move`);
        return false;
    }

    return true;
  }

  advanceLawnMowerForwardOneStep() {
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