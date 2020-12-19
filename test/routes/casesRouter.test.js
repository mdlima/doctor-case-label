import 'should';

import httpMocks from 'node-mocks-http';
import TestSetup from '../TestSetup';
import { findCaseToReview, casePatch } from '../../routes/casesRouter';
import CaseModel from '../../models/CaseModel';

const setup = new TestSetup();

describe('Cases Router', function () {
  before(async function () {
    await setup.connectDB();
    await setup.addFixtures();
  });
  after(async function () {
    await setup.dropFixtures();
    await setup.disconnectDB();
  });

  describe('GET /cases/nextToReview', function () {
    it('Should return a case to review', async function () {
      const response = httpMocks.createResponse();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/cases/nextToReview',
      });

      await findCaseToReview(request, response);
      response.statusCode.should.equal(200);
      should.equal(response._getJSONData().review, undefined);
    });
  });

  describe('PUT /cases/id/:id', function () {
    it('Should update case', async function () {
      const testCase = setup.cases.find((c) => c.review == null);
      const testUserId = setup.users[0]._id;
      const testConditionId = setup.conditions[0]._id;
      const response = httpMocks.createResponse();
      const request = httpMocks.createRequest({
        method: 'PATCH',
        url: `/cases/id/${testCase._id}`,
        params: {
          id: testCase._id,
        },
        body: {
          review: {
            userId: testUserId,
            conditionId: testConditionId,
          }
        }
      });

      await casePatch(request, response);
      response.statusCode.should.equal(200);

      const updatedCase = await CaseModel.findById(testCase._id);
      updatedCase.review.userId.should.eql(testUserId);
      updatedCase.review.conditionId.should.eql(testConditionId);
    });
    it('Should not update case invalid', async function () {
      const testCase = setup.cases.find((c) => c.review == null);
      const testUserId = setup.users[0]._id;
      const testConditionId = setup.conditions[0]._id;
      const response = httpMocks.createResponse();
      const request = httpMocks.createRequest({
        method: 'PATCH',
        url: `/cases/id/:id`,
        params: {
          id: 'aaa',
        },
        body: {
          review: {
            userId: testUserId,
            conditionId: testConditionId,
          }
        }
      });

      await casePatch(request, response);
      response.statusCode.should.equal(400);
    });
    it('Should not update case with invalid User', async function () {
      const testCase = setup.cases.find((c) => c.review == null);
      const testUserId = setup.users[0]._id;
      const testConditionId = setup.conditions[0]._id;
      const response = httpMocks.createResponse();
      const request = httpMocks.createRequest({
        method: 'PATCH',
        url: `/cases/id/${testCase._id}`,
        params: {
          id: testCase._id,
        },
        body: {
          review: {
            userId: 'aaa',
            conditionId: testConditionId,
          }
        }
      });

      await casePatch(request, response);
      response.statusCode.should.equal(400);
    });
    it('Should not update case with invalid condition', async function () {
      const testCase = setup.cases.find((c) => c.review == null);
      const testUserId = setup.users[0]._id;
      const response = httpMocks.createResponse();
      const request = httpMocks.createRequest({
        method: 'PATCH',
        url: `/cases/id/${testCase._id}`,
        params: {
          id: testCase._id,
        },
        body: {
          review: {
            userId: testUserId,
            conditionId: 'aaa',
          }
        }
      });

      await casePatch(request, response);
      response.statusCode.should.equal(400);
    });
  });
});
