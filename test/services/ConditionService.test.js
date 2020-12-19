import 'should';

import TestSetup from '../TestSetup';
import ConditionService from '../../services/ConditionService';

const setup = new TestSetup();

describe('Condition Service', function () {
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

  it('Should list all conditions', async function () {
    const allConditions = await ConditionService.list();

    allConditions.length.should.equal(setup.conditions.length);
  });
});
