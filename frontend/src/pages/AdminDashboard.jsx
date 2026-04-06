import { useEffect, useState } from 'react';
import api from '../services/api';
import { PlayCircle, Users } from 'lucide-react';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allocating, setAllocating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await api.get('/admin/students?pageNumber=1');
      setStudents(data.students);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAllocation = async () => {
    if (!window.confirm("Are you sure you want to run the allocation algorithm? This will process all pending students automatically based on merit.")) {
      return;
    }
    setAllocating(true);
    setMessage('');
    try {
      const { data } = await api.post('/admin/run-allocation');
      setMessage(data.message + `. Allocated ${data.allocatedCount} students.`);
      fetchStudents(); // Refresh the list
    } catch (error) {
      setMessage(error.response?.data?.message || 'Algorithm failed');
    } finally {
      setAllocating(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading Admin Dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" /> Administrative Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage students and trigger allocation.</p>
        </div>
        <div>
          <button 
            onClick={handleRunAllocation}
            disabled={allocating}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <PlayCircle className="h-5 w-5" />
            {allocating ? 'Processing Algorithm...' : 'Run Allocation Algorithm'}
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-lg flex items-center gap-2 font-medium">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Registered Students (Sorted by Merit)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase p-4 border-b">
              <tr>
                <th className="px-6 py-3 font-semibold">Name / Email</th>
                <th className="px-6 py-3 font-semibold text-center">Score</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Allocated Dept</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No students recorded yet.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{student.user?.name}</div>
                      <div className="text-xs text-gray-500">{student.user?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-700">
                      {student.totalScore}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${student.status === 'allocated' ? 'bg-green-100 text-green-700' : 
                          student.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'}`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {student.allocatedDepartment ? student.allocatedDepartment.name : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
