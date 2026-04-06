import express from 'express';
import { 
  createDepartment, 
  getDepartments, 
  updateDepartment, 
  deleteDepartment, 
  getStudents, 
  runAllocation,
  departmentSchema
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Apply auth and admin middleware to all admin routes
router.use(protect, admin);

router.route('/departments')
  .post(validate(departmentSchema), createDepartment)
  .get(getDepartments);

router.route('/departments/:id')
  .put(validate(departmentSchema), updateDepartment)
  .delete(deleteDepartment);

router.get('/students', getStudents);
router.post('/run-allocation', runAllocation);

export default router;
