import CaseModel from '../../models/CaseModel';

class CaseFixtures {
  static fixtures = [
    {
      _id: 'baaaaaaaaaaaaaaaaaaaaaa1',
      filename: 'withcode',
      ehr: 'EHR for withcode.',
      review: {
        userId: 'daaaaaaaaaaaaaaaaaaaaaa1',
        conditionId: '5fda689f5dc461711d24bd72',
        date: '2020-11-17T01:24:23.339Z'
      }
    },
    {
      _id: 'baaaaaaaaaaaaaaaaaaaaaa2',
      filename: 'nocode',
      ehr: 'EHR for nocode.'
    },
    {
      _id: 'baaaaaaaaaaaaaaaaaaaaaa3',
      filename: 'another_withcode',
      ehr: 'EHR for another_withcode.',
      review: {
        userId: 'daaaaaaaaaaaaaaaaaaaaaa1',
        conditionId: '5fda689f5dc461711d24bd72',
        date: '2020-11-17T01:24:23.339Z'
      }
    },
    {
      _id: 'baaaaaaaaaaaaaaaaaaaaaa4',
      filename: 'another_nocode',
      ehr: 'EHR for another_nocode.'
    },
    {
      _id: 'baaaaaaaaaaaaaaaaaaaaaa5',
      filename: '00D3FEF53970819CCC4D01C836555362.txt',
      ehr: 'Patient presents with Flank Pain. The patient is a 51-year-old female, no significant past medical history, presents to the emergency department with left-sided flank pain ongoing ×1 month now with abdominal pain. The pain is intermittent, but has been worsening. She reports new onset nausea, vomiting, diarrhea for the last 2 days. She reports multiple episodes of nonbloody emesis starting yesterday. She has also had multiple episodes of nonbloody diarrhea. She has gone to see her primary care doctor twice since symptoms began. She was found to have mildly elevated creatinine and was referred to a nephrologist. However, the nephrologist is not willing to see her until . The patient feels she cannot wait that long especially in light of these new symptoms. She then followed up with her primary care doctor again and he prescribed Zofran and loperamide but offered her no other solutions. The pain has since increased as well. She denies any fevers, chills. She denies urinary symptoms including burning with urination, frequency, hematuria.'
    },
    {
      _id: 'baaaaaaaaaaaaaaaaaaaaaa6',
      filename: '00F5FC934E3FCE1778B175D98B8E691C.txt',
      ehr: 'Patient  is an 42 year old  male.    Chief Complaint: Establish Care and Physical    HPI      Hemorrhoids  Bothersome  Comes and goes  Especially with sedentary life style  Recently worse  Couple nights where almost wakes patient up  Gets intermittently constipated  High fiber diet    Patient Active Problem    Diagnoses Code\n -  Hemorrhoids 455.6E       No outpatient prescriptions have been marked as taking for the  encounter (Office Visit) with ,  C.     Allergies   Allergen Reactions\n -  Pcn (Penicillins)\n -  Morphine        No past medical history on file.  Past Surgical History   Procedure Date\n -  Hx knee surgery      Arthroscopy age 15 for torn meniscus       Family History   Problem Relation  of Onset\n -  Cancer Mother      Breast\n -  Hypertension Mother\n -  Hypertension Father      History   Substance Use Topics\n -  Smoking status: Never Smoker\n -  Smokeless tobacco: Not on file\n'
    }
  ];

  static async addFixtures() {
    return CaseModel.create(CaseFixtures.fixtures);
  }

  static async dropFixtures() {
    return Promise.all(CaseFixtures.fixtures.map((f) => CaseModel.deleteOne({ _id: f._id })));
  }
}

export default CaseFixtures;
