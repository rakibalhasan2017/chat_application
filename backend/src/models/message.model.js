import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema (can be a single recipient or a group)
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String, // This can store a URL if the message contains a file or image
      default: null,
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
