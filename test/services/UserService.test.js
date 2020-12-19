import 'should';

import TestSetup from '../TestSetup';
import UserService from '../../services/UserService';

const setup = new TestSetup();

describe('User Service', function () {
  before(async function () {
    await setup.connectDB();
    await setup.addFixtures();
  });
  after(async function () {
    await setup.dropFixtures();
    await setup.disconnectDB();
  });

  it('Should login user successfully', async function () {
    const testUser = setup.users[0];
    const loggedInUser = await UserService.login({ email: testUser.email, password: testUser.password });

    should.exist(loggedInUser);
    loggedInUser.email.should.eql(testUser.email);
  });
  it('Should fail login with wrong email/pass', async function() {
    const testUser = setup.users[0];

    testUser.password = 'wrongpassword';
    const loggedInUser = await UserService.login({ email: testUser.email, password: testUser.password });

    should.equal(loggedInUser, undefined);
  });
});
