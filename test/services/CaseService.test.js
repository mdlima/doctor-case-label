import 'should';

import TestSetup from '../TestSetup';
import CaseService from '../../services/CaseService';
import CaseModel from '../../models/CaseModel';

const setup = new TestSetup();

describe('Case Service', function () {
  before(async function () {
    await setup.connectDB();
  });
  after(async function () {
    await setup.disconnectDB();
  });
  beforeEach(async function () {
    await setup.addFixtures()
  });
  afterEach(async function () {
    await setup.dropFixtures()
  });

  it('Should find next case to review', async function () {
    const testCase = await CaseService.findNextToReview();

    testCase.should.be.ok;
  });
  it('Should not have a case to review when all are reviewed', async function () {
    const reviewUserId = setup.users[0]._id;
    const reviewConditionId = setup.conditions[0]._id;
    await CaseModel.updateMany({ review: null }, { review: { userId: reviewUserId, conditionId: reviewConditionId }});

    const testCase = await CaseService.findNextToReview();
    should.equal(testCase, undefined);
  });
  it('Should not have a case to review when there are no cases', async function () {
    await setup.dropFixtures();
    const testCase = await CaseService.findNextToReview();

    should.equal(testCase, undefined);
  });
});
