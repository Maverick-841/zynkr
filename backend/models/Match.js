import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { 
    type: String, 
    enum: ['sent', 'interview', 'selected', 'rejected'], 
    default: 'sent' 
  }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);
export default Match;
