import mongoose from 'mongoose';

const CaseSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  ehr: {
    type: String,
    required: true,
  },
  review: new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    conditionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Condition',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }),
});

// eslint-disable-next-line func-names
CaseSchema.static('findOneToReview', function () {
  return this.findOne({ review: null });
});

const CaseModel = mongoose.models.CaseModel || mongoose.model('CaseModel', CaseSchema, 'cases');

export default CaseModel;
