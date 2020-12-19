import UserModel from '../models/UserModel';

class UserService {
  static async login({ email, password }) {
    // TODO: implement password hashing / crypt
    return UserModel.findOne({ email, password });
  }
}

export default UserService;
