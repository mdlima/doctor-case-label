import CaseModel from '../models/CaseModel';

class CaseService {
  static async findNextToReview() {
    return CaseModel.findOneToReview();
  }

  static async patchCase(caseId, caseData) {
    const caseToPatch = await CaseModel.findById(caseId);
    caseToPatch.set(caseData);

    return caseToPatch.save();
  }
}

export default CaseService;
