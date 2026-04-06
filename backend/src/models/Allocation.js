import mongoose from 'mongoose';

const allocationSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Department',
    },
    scoreUsed: {
      type: Number,
      required: true,
    },
    round: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Allocation = mongoose.model('Allocation', allocationSchema);
export default Allocation;
