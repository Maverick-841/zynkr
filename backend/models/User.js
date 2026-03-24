import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['candidate', 'admin'], 
    default: 'candidate' 
  },
  profile: {
    specialization: { type: String }, // frontend/backend/fullstack
    skills: [String],
    github_link: String,
    linkedin_link: String,
    resume_url: String,
    experience_level: String,
    expected_stipend: String,
    availability_24hr: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ['pending', 'shortlisted', 'rejected'], 
      default: 'pending' 
    }
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
