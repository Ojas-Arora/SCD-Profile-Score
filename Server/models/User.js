import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  inSightsCount: {
    type: Number,
    default: 0,
  },
  createdOn: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
  phone: {
    type: String,
    required: false,
    unique: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
},
 title: {
    type: String,
    required: false,
    trim: true
},
 linkedin: {
    type: String,
    required: false,
    unique: true,
    
},
  dob: {
    type: Date, // Date of Birth field
    required: false, // Optional field
  },
  location: {
    type: String, // Can store city, state, or country
    required: false, // Optional field
  },
  profilePic: { type: String, default: '' }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
