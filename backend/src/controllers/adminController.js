import Department from '../models/Department.js';
import StudentProfile from '../models/StudentProfile.js';
import { runAllocationAlgorithm } from '../services/allocationService.js';
import Joi from 'joi';

export const departmentSchema = Joi.object({
  name: Joi.string().required(),
  totalSeats: Joi.number().min(1).required(),
  minCutoff: Joi.number().min(0).default(0),
});

// @desc    Create a new department
// @route   POST /api/admin/departments
// @access  Private/Admin
export const createDepartment = async (req, res, next) => {
  try {
    const { name, totalSeats, minCutoff } = req.body;

    const deptExists = await Department.findOne({ name });
    if (deptExists) {
      res.status(400);
      throw new Error('Department already exists');
    }

    const department = await Department.create({
      name,
      totalSeats,
      availableSeats: totalSeats,
      minCutoff,
    });

    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all departments
// @route   GET /api/admin/departments
// @access  Private
export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (error) {
    next(error);
  }
};

// @desc    Update department
// @route   PUT /api/admin/departments/:id
// @access  Private/Admin
export const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);

    if (department) {
      department.name = req.body.name || department.name;
      department.totalSeats = req.body.totalSeats || department.totalSeats;
      // Note: Admin might need to manually sync availableSeats if totalSeats changes in middle of process.
      // For simplicity, we just reset it here if no allocation happened yet.
      department.availableSeats = req.body.availableSeats !== undefined ? req.body.availableSeats : department.availableSeats;
      department.minCutoff = req.body.minCutoff !== undefined ? req.body.minCutoff : department.minCutoff;

      const updatedDepartment = await department.save();
      res.json(updatedDepartment);
    } else {
      res.status(404);
      throw new Error('Department not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete department
// @route   DELETE /api/admin/departments/:id
// @access  Private/Admin
export const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);

    if (department) {
      await Department.deleteOne({ _id: department._id });
      res.json({ message: 'Department removed' });
    } else {
      res.status(404);
      throw new Error('Department not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
export const getStudents = async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    // Optional filtering
    const keyword = req.query.keyword
      ? {
          status: req.query.keyword,
        }
      : {};

    const count = await StudentProfile.countDocuments({ ...keyword });
    const students = await StudentProfile.find({ ...keyword })
      .populate('user', 'name email')
      .populate('allocatedDepartment', 'name')
      .sort({ totalScore: -1 }) // Sorted by merit
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ students, page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error) {
    next(error);
  }
};

// @desc    Run Allocation Algorithm
// @route   POST /api/admin/run-allocation
// @access  Private/Admin
export const runAllocation = async (req, res, next) => {
  try {
    const result = await runAllocationAlgorithm();
    res.json({ message: 'Allocation successful', ...result });
  } catch (error) {
    next(error);
  }
};
