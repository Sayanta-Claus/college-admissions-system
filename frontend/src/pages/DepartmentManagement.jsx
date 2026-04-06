import { useState, useEffect } from 'react';
import api from '../services/api';
import { Pencil, Trash2, Plus } from 'lucide-react';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', totalSeats: '', minCutoff: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const { data } = await api.get('/admin/departments');
      setDepartments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/departments/${editingId}`, formData);
      } else {
        await api.post('/admin/departments', formData);
      }
      setFormData({ name: '', totalSeats: '', minCutoff: '' });
      setEditingId(null);
      fetchDepartments();
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred');
    }
  };

  const handleEdit = (dept) => {
    setEditingId(dept._id);
    setFormData({ name: dept.name, totalSeats: dept.totalSeats, minCutoff: dept.minCutoff });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await api.delete(`/admin/departments/${id}`);
        fetchDepartments();
      } catch (error) {
        alert(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
            {editingId ? 'Edit Department' : 'Add New Department'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Computer Science" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
              <input type="number" min="1" required value={formData.totalSeats} onChange={e => setFormData({...formData, totalSeats: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Cutoff (Score)</label>
              <input type="number" min="0" required value={formData.minCutoff} onChange={e => setFormData({...formData, minCutoff: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="pt-2 flex gap-2">
              <button type="submit" className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1">
                {editingId ? 'Update' : <><Plus className="h-4 w-4" /> Add</>}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', totalSeats: '', minCutoff: '' }); }} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
             <h2 className="text-xl font-bold text-gray-900">Manage Departments</h2>
          </div>
          <div className="overflow-x-auto">
            {loading ? <div className="p-6 text-center text-gray-500">Loading...</div> : (
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 uppercase p-4 border-b">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Name</th>
                    <th className="px-6 py-3 font-semibold text-center">Seats (Avail / Total)</th>
                    <th className="px-6 py-3 font-semibold text-center">Cutoff</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.length === 0 ? (
                    <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No departments added yet.</td></tr>
                  ) : (
                    departments.map((dept) => (
                      <tr key={dept._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{dept.name}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-blue-600">{dept.availableSeats}</span> / {dept.totalSeats}
                        </td>
                        <td className="px-6 py-4 text-center">{dept.minCutoff}</td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(dept)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(dept._id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
