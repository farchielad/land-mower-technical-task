import chai from 'chai';
const assert = chai.assert,
expect = chai.expect;
import spies from 'chai-spies';
import MowerController from '../src/MowerController.js';
import LawnMower from '../src/LawnMower.js';

chai.use(spies);

describe('Lawn LawnMower', function() {
  describe('test initialization of mower', function() {
    let lawnMower = new LawnMower([1, 1], 'N', [1, 1]);

    it('setting xPosition, yPosition and caridnal direction', function () {
      assert.deepEqual([lawnMower.xPosition, lawnMower.yPosition, lawnMower.direction], [1, 1, 'N']);
    });
  });

  describe('validate rotations and forward movement', function () {
    context('Should be set at [1,1,N]', function () {
      let lawnMower = new LawnMower([1, 1], 'N', [5, 5]);

      it('should rotate 90 degrees left', function () {
        lawnMower.rotateLawnMower90DegreesLeft();
        assert.equal(lawnMower.direction, 'N')
      });

      it('should rotate 90 degrees right', function () {
        lawnMower.rotateLawnMower90DegreesRight();
        assert.equal(lawnMower.direction, 'E')
      });

      it('should advance one step forward', function () {
        lawnMower.advanceLawnMowerForwardOneStep();
        assert.equal(lawnMower.yPosition, 2)
      });
    });

    it('should stay within bounderies', function () {
      let lawnMower = new LawnMower([1, 1], 'N', [1, 1]);
      lawnMower.advanceLawnMowerForwardOneStep();
      assert.equal(lawnMower.yPosition, 1)
    })
  });
});
describe('LawnMower Controller', function () {
  describe('operate commands', function () {
    const lawnMower = new LawnMower([1, 1], 'N', [5, 5]);
    const mowerController = new MowerController(lawnMower);
    it('validate R command in sequence', function () {
      const spy = chai.spy.on(lawnMower, 'rotateLawnMower90DegreesRight');
      mowerController.executeMovementAndOrientationSequence(['R']);
      expect(spy).to.have.been.called();
      chai.spy.restore(lawnMower, 'rotateLawnMower90DegreesRight')
    });

    it('validate L command in sequence', function () {
      const spy = chai.spy.on(lawnMower, 'rotateLawnMower90DegreesLeft');
      mowerController.executeMovementAndOrientationSequence(['L']);
      expect(spy).to.have.been.called();
      chai.spy.restore(lawnMower, 'rotateLawnMower90DegreesLeft')
    });

    it('validate F command in sequence', function () {
      const spy = chai.spy.on(lawnMower, 'advanceLawnMowerForwardOneStep');
      mowerController.executeMovementAndOrientationSequence(['F']);
      expect(spy).to.have.been.called();
      chai.spy.restore(lawnMower, 'advanceLawnMowerForwardOneStep')
    });
    
    it('handle any other character input in the sequence other than F, L, R', function () {
      const spy1 = chai.spy.on(lawnMower, 'advanceLawnMowerForwardOneStep');
      const spy2 = chai.spy.on(lawnMower, 'rotateLawnMower90DegreesLeft');
      const spy3 = chai.spy.on(lawnMower, 'rotateLawnMower90DegreesRight');
      mowerController.executeMovementAndOrientationSequence(['X']);
      expect(spy1).to.not.have.been.called();
      expect(spy2).to.not.have.been.called();
      expect(spy3).to.not.have.been.called();
      chai.spy.restore();
    })
  })
});