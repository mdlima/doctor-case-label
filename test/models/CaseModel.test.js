import 'should';

import TestSetup from '../TestSetup';
import CaseModel from '../../models/CaseModel';

const setup = new TestSetup();

describe('Case Model / Schema', function() {
  it('Should be here', function() {
    should.exists(CaseModel);
  });
  it('Should have the correct properties', function() {
    const testCase = new CaseModel();

    testCase.should.have.property('filename');
    testCase.should.have.property('ehr');
    testCase.should.have.property('review');

    const childSchema = CaseModel.prototype.schema.childSchemas.find(childSchema => childSchema.model.path === 'review');
    childSchema.should.be.ok;

    const ReviewModel = childSchema.model;
    const review = new ReviewModel();
    review.should.have.property('userId');
    review.should.have.property('conditionId');
    review.should.have.property('date');
  });
});

describe('Case Model DB operations', function () {
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

  describe('Retrieving a case', function() {
    it('Should load a case', async function() {
      const testCase = await CaseModel.findOne();
      testCase.should.be.ok;
    });
    it('Should list all cases', async function() {
      const testCases = await CaseModel.find();
      testCases.should.be.ok;
    });
    it('Should find one to review', async function() {
      const testCases = await CaseModel.findOneToReview();
      testCases.should.be.ok;
    });
  });

  describe('Reviewing a case', function () {
    const userId = setup.users[0]._id;
    const conditionId = setup.conditions[0]._id;
    const date = Date.now();

    it('Should add review to case', async function () {
      const testCase = await CaseModel.findOne();
      testCase.review = {
        userId,
        conditionId,
        date,
      };
      testCase.save();

      testCase.review.userId.should.equal(userId);
      testCase.review.conditionId.should.equal(conditionId);
      testCase.review.date.getTime().should.equal(date);
    });

    // it('Should validate if userId is valid');
    // it('Should validate if conditionId is valid');
    // it('Should validate if date is valid');
  });
});
