import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  ]
});

// ✅ Enforce unique name per user (compound index)
projectSchema.index({ name: 1, users: 1 }, { unique: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
