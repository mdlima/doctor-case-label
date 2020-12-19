import 'should';

import httpMocks from 'node-mocks-http';
import TestSetup from '../TestSetup';
import { conditionsList } from '../../routes/conditionsRouter';

const setup = new TestSetup();

describe('GET /conditions', function () {
  before(async function () {
    await setup.connectDB();
    await setup.addFixtures();
  });
  after(async function () {
    await setup.dropFixtures();
    await setup.disconnectDB();
  });

  it('Should return list of all conditions', async function () {
    const response = httpMocks.createResponse();
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/conditions',
    });

    await conditionsList(request, response);
    response.statusCode.should.equal(200);
    response._getJSONData().length.should.eql(setup.conditions.length);
  });
});
