import mongoose from 'mongoose';
// import Fixtures from 'node-mongodb-fixtures';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserFixtures from './fixtures/UserFixtures';
import ConditionFixtures from './fixtures/ConditionFixtures';
import CaseFixtures from './fixtures/CaseFixtures';

class TestSetup {
  constructor() {
    // Setup in-memory MongoDB server
    this.server = new MongoMemoryServer();
    // const url = 'mongodb://localhost:27017/doctor-case-label';
    this.connOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    this.users = UserFixtures.fixtures;
    this.conditions = ConditionFixtures.fixtures;
    this.cases = CaseFixtures.fixtures;
    this.url = null;
  }

  async connectDB() {
    this.url = await this.server.getUri();
    return mongoose.connect(this.url, this.connOptions);
  }

  async disconnectDB() {
    // const url = await this.server.getUri();
    return mongoose.disconnect(this.url, this.connOptions);
  }

  async addUsers() {
    this.users = await UserFixtures.addFixtures();
    return this.users;
  }

  async dropUsers() {
    this.users = null;
    return UserFixtures.dropFixtures();
  }

  async addConditions() {
    this.conditions = await ConditionFixtures.addFixtures();
    return this.conditions;
  }

  async dropConditions() {
    this.conditions = null;
    return ConditionFixtures.dropFixtures();
  }

  async addCases() {
    this.cases = await CaseFixtures.addFixtures();
    return this.cases;
  }

  async dropCases() {
    this.cases = null;
    return CaseFixtures.dropFixtures();
  }

  async addFixtures() {
    // const url = await this.server.getUri();
    // await fixtures.connect(url, connOptions);
    // await fixtures.load();
    // await fixtures.disconnect();
    return Promise.all([
      // this.connectDB(),
      this.addUsers(),
      this.addConditions(),
      this.addCases(),
    ]);
  }

  async dropFixtures() {
     return Promise.all([
      // this.connectDB(),
      this.dropUsers(),
      this.dropConditions(),
      this.dropCases(),
     ]);
  }

};

export default TestSetup;
