import express from 'express';
import { updateProfile, getProfile, updatePreferences, getResult, profileSchema, preferencesSchema } from '../controllers/studentController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Apply auth middleware to all student routes
router.use(protect);

router.route('/profile')
  .post(validate(profileSchema), updateProfile)
  .get(getProfile);

router.put('/preferences', validate(preferencesSchema), updatePreferences);
router.get('/result', getResult);

export default router;
