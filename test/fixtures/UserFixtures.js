import UserModel from '../../models/UserModel';

const { ObjectID: ObjectId } = require('mongodb');

class UserFixtures {
  static fixtures = [
    {
      _id: ObjectId('daaaaaaaaaaaaaaaaaaaaaa1'),
      name: 'aaa',
      email: 'User aaa',
      password: 'User aaa',
    },
    {
      _id: ObjectId('daaaaaaaaaaaaaaaaaaaaaa2'),
      name: 'bbb',
      email: 'User bbb',
      password: 'User bbb',
    },
    {
      _id: ObjectId('daaaaaaaaaaaaaaaaaaaaaa3'),
      name: 'cc123',
      email: 'User cc123',
      password: 'User cc123',
    }
  ];

  static async addFixtures() {
    return UserModel.create(UserFixtures.fixtures);
  }

  static async dropFixtures() {
    return Promise.all(UserFixtures.fixtures.map((f) => UserModel.deleteOne({ _id: f._id })));
  }
}

export default UserFixtures;
