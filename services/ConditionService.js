import ConditionModel from '../models/ConditionModel';

class ConditionService {
  static async list() {
    return ConditionModel.find();
  }
}

export default ConditionService;
