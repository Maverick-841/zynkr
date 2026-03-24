import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  contact_person: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role_hiring: String,
  skills_required: [String],
  stipend: String,
  hiring_type: { type: String, enum: ['urgent', 'normal'], default: 'normal' },
  interview_speed: { type: String, enum: ['24hr', '3days', '1week'], default: '3days' }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;
