import MowerController from './MowerController.js';
import LawnMower from './LawnMower.js';

import { readFileSync } from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = readFileSync(path.resolve(__dirname, '../sampleData.txt'), 'utf8').split("\n");
if (data.length === 0) {
  console.error('No valid input data provided');
} else {
  // first row in the file represents the lawn as a matrix, represented as width and height
  const lawn = data[0].split(' ').map(character => parseInt(character));
  if (lawn.length === 0) {
    console.error('Error: No lawn data was provided.')
  }

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
    console.log(lawnMower.lawnMowerPosition);
    currentRowInDataFile += 2;
  }
}