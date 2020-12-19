import 'should';

import httpMocks from 'node-mocks-http';
import TestSetup from '../TestSetup';
import { userLogin } from '../../routes/usersRouter';

const setup = new TestSetup();

describe('POST /users/login', function () {
  before(async function () {
    await setup.connectDB();
    await setup.addFixtures();
  });
  after(async function () {
    await setup.dropFixtures();
    await setup.disconnectDB();
  });

  it('Should login correctly and return correct user', async function () {
    const testUser = setup.users[0];
    const response = httpMocks.createResponse();
    const request  = httpMocks.createRequest({
      method: 'POST',
      url: '/users/login',
      body: {
        email: testUser.email,
        password: testUser.password,
      }
    });

    await userLogin(request, response);
    response.statusCode.should.equal(200);
    response._getJSONData()._id.should.eql(testUser._id.toString());
  });
  it('Should fail if incorrect credentials', async function () {
    const testUser = setup.users[0];
    const response = httpMocks.createResponse();
    const request  = httpMocks.createRequest({
      method: 'POST',
      url: '/users/login',
      body: {
        email: testUser.email,
        password: 'wrongpass',
      }
    });

    await userLogin(request, response);
    response.statusCode.should.equal(401);
  });
});
