import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,  // Make sure the email is always in lowercase
    },
    fullname: {
        type: String,
        required: true,
        unique: true,  // Ensure username is unique
        trim: true,  // Remove leading/trailing space
      },
    password: {
      type: String,
      required: true,
    },
    profilepic: {
        type: String,
        default: "",
    }
  },
  {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
  }
);

const User = mongoose.model('User', userSchema);

export default User;
