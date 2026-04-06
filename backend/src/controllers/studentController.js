import StudentProfile from '../models/StudentProfile.js';
import Joi from 'joi';

export const profileSchema = Joi.object({
  physics: Joi.number().min(0).max(100).required(),
  chemistry: Joi.number().min(0).max(100).required(),
  mathematics: Joi.number().min(0).max(100).required(),
  preferences: Joi.array().items(Joi.string()).optional(),
});

export const preferencesSchema = Joi.object({
  preferences: Joi.array().items(Joi.string()).required(),
});

// @desc    Create or update student profile (Marks)
// @route   POST /api/student/profile
// @access  Private/Student
export const updateProfile = async (req, res, next) => {
  try {
    const { physics, chemistry, mathematics, preferences } = req.body;
    
    let profile = await StudentProfile.findOne({ user: req.user._id });
    
    const totalScore = Number(physics) + Number(chemistry) + Number(mathematics);

    if (profile) {
      // Update logic
      profile.physics = physics;
      profile.chemistry = chemistry;
      profile.mathematics = mathematics;
      profile.totalScore = totalScore;
      if (preferences) profile.preferences = preferences;
      
      const updatedProfile = await profile.save();
      return res.json(updatedProfile);
    }

    // Create logic
    profile = await StudentProfile.create({
      user: req.user._id,
      physics,
      chemistry,
      mathematics,
      totalScore,
      preferences: preferences || []
    });

    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
};

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private/Student
export const getProfile = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user._id }).populate('preferences', 'name totalSeats minCutoff');
    if (profile) {
      res.json(profile);
    } else {
      res.json(null); // No profile yet
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update preferences
// @route   PUT /api/student/preferences
// @access  Private/Student
export const updatePreferences = async (req, res, next) => {
  try {
    const { preferences } = req.body;
    
    const profile = await StudentProfile.findOne({ user: req.user._id });
    if (!profile) {
      res.status(404);
      throw new Error('Profile not found. Please fill academic details first');
    }

    if (profile.status !== 'pending') {
      res.status(400);
      throw new Error('Cannot update preferences after allocation');
    }

    profile.preferences = preferences;
    const updatedProfile = await profile.save();
    
    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

// @desc    Get allocation result
// @route   GET /api/student/result
// @access  Private/Student
export const getResult = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user._id }).populate('allocatedDepartment', 'name');
    
    if (!profile) {
      res.status(404);
      throw new Error('Profile not found');
    }

    res.json({
      status: profile.status,
      allocatedDepartment: profile.allocatedDepartment,
      totalScore: profile.totalScore
    });
  } catch (error) {
    next(error);
  }
};
