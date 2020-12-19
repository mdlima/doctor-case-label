import 'should';

import TestSetup from '../TestSetup';
import UserModel from '../../models/UserModel';

const setup = new TestSetup();

describe('User Model / Schema', function() {
  it('Should be here', function() {
    should.exists(UserModel);
  });
  it('Should have the correct properties', function() {
    const testUser = new UserModel();

    testUser.should.have.property('name');
    testUser.should.have.property('email');
    testUser.should.have.property('password');
  });
});

describe('User Model DB operations', function() {
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

  describe('Retrieving a user', function() {
    it('Should load a user', async function() {
      const testUser = await UserModel.findOne();
      testUser.should.be.ok;
    });

    it('Should load a user by email', async function () {
      const testUserFixture = setup.users[0];
      const testUserLoaded = await UserModel.findOne({ email: testUserFixture.email });
      testUserLoaded.should.be.ok;
      testUserLoaded.email.should.eql(testUserFixture.email);
    });

    it('Should list all users', async function() {
      const testUsers = await UserModel.find();
      testUsers.should.be.ok;
      testUsers.length.should.equal(setup.users.length);
    });
  });
});
