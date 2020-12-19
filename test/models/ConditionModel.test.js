import 'should';

import TestSetup from '../TestSetup';
import ConditionModel from '../../models/ConditionModel';

const setup = new TestSetup();

describe('Condition Model / Schema', function() {
  it('Should be here', function() {
    should.exists(ConditionModel);
  });
  it('Should have the correct properties', function() {
    const testCondition = new ConditionModel();

    testCondition.should.have.property('code');
    testCondition.should.have.property('description');
  });
});

describe('Condition Model DB operations', function() {
  before(async function () {
    Promise.all([
      setup.connectDB(),
      setup.addFixtures(),
    ]);
  });
  after(async function () {
    Promise.all([
      setup.dropFixtures(),
      setup.disconnectDB(),
    ]);
  });

  describe('Retrieving a condition', function() {
    it('Should load a condition', async function() {
      const testCondition = await ConditionModel.findOne();
      testCondition.should.be.ok;
    });

    it('Should list all conditions', async function() {
      const testConditions = await ConditionModel.find();
      testConditions.should.be.ok;
    });
  });
});
