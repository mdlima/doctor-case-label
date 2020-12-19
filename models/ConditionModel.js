import mongoose from 'mongoose';

const ConditionSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ConditionModel = mongoose.models.ConditionModel || mongoose.model('ConditionModel', ConditionSchema, 'conditions');

export default ConditionModel;
