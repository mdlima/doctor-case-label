import ConditionModel from '../../models/ConditionModel';

const { ObjectID: ObjectId } = require('mongodb');

class ConditionFixtures {
  static fixtures = [
    {
      _id: ObjectId('caaaaaaaaaaaaaaaaaaaaaa1'),
      code: 'aaa',
      description: 'Condition aaa'
    },
    {
      _id: ObjectId('caaaaaaaaaaaaaaaaaaaaaa2'),
      code: 'bbb',
      description: 'Condition bbb'
    },
    {
      _id: ObjectId('caaaaaaaaaaaaaaaaaaaaaa3'),
      code: 'cc123',
      description: 'Condition cc123'
    }
  ];

  static async addFixtures() {
    return ConditionModel.create(ConditionFixtures.fixtures);
  }

  static async dropFixtures() {
    return Promise.all(ConditionFixtures.fixtures.map((f) => ConditionModel.deleteOne({ _id: f._id })));
  }
}

export default ConditionFixtures;
