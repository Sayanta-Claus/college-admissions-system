import StudentProfile from '../models/StudentProfile.js';
import Department from '../models/Department.js';
import Allocation from '../models/Allocation.js';

export const runAllocationAlgorithm = async () => {
  try {
    // 1. Fetch all pending students, populated with their preferences
    const students = await StudentProfile.find({ status: 'pending' })
      .sort({ totalScore: -1 }) // Sort purely by totalScore descending (merit based)
      .populate('user');

    // 2. Fetch all departments
    const departmentsList = await Department.find({});
    
    // Map to memory for faster processing
    const departments = {};
    departmentsList.forEach((dept) => {
      departments[dept._id.toString()] = dept;
    });

    const allocatedRecords = [];
    const updatedStudents = [];
    
    // 3. Iterate through students based on merit
    for (const student of students) {
      let allocatedDept = null;

      // Iterate through their ordered preferences
      for (const prefId of student.preferences) {
        const deptIdStr = prefId.toString();
        const dept = departments[deptIdStr];

        if (dept && dept.availableSeats > 0 && student.totalScore >= dept.minCutoff) {
          // Allocate this department
          allocatedDept = dept;
          break; // Stop checking further preferences for this student
        }
      }

      if (allocatedDept) {
        // Allocate!
        student.allocatedDepartment = allocatedDept._id;
        student.status = 'allocated';
        departments[allocatedDept._id.toString()].availableSeats -= 1;

        allocatedRecords.push({
          student: student.user._id,
          department: allocatedDept._id,
          scoreUsed: student.totalScore,
          round: 1, // basic single round system for now
        });
      } else {
        student.status = 'rejected';
      }
      updatedStudents.push(student);
    }

    // 4. Save updates to database using transactions if possible, or sequentially
    // Update Departments
    for (const deptId in departments) {
      await departments[deptId].save();
    }

    // Update Students
    for (const student of updatedStudents) {
      await student.save();
    }

    // Insert Allocation Records
    if (allocatedRecords.length > 0) {
      await Allocation.insertMany(allocatedRecords);
    }

    return { success: true, allocatedCount: allocatedRecords.length };
  } catch (error) {
    console.error('Allocation Error:', error);
    throw new Error('Algorithm execution failed');
  }
};
