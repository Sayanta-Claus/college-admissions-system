import mongoose from 'mongoose';

const studentProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    physics: { type: Number, required: true },
    chemistry: { type: Number, required: true },
    mathematics: { type: Number, required: true },
    totalScore: {
      type: Number,
      required: true,
    },
    preferences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
      },
    ],
    allocatedDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'allocated', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
export default StudentProfile;
