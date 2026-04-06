import { useState, useEffect } from 'react';
import api from '../services/api';
import { BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [departments, setDepartments] = useState([]);
  
  const [marks, setMarks] = useState({ physics: '', chemistry: '', mathematics: '' });
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profRes, deptRes] = await Promise.all([
        api.get('/student/profile'),
        api.get('/departments')
      ]);
      if (profRes.data) {
        setProfile(profRes.data);
        setMarks({
          physics: profRes.data.physics,
          chemistry: profRes.data.chemistry,
          mathematics: profRes.data.mathematics
        });
        setSelectedPrefs(profRes.data.preferences.map(p => typeof p === 'string' ? p : p._id));
      }
      setDepartments(deptRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMarks = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const { data } = await api.post('/student/profile', { ...marks, preferences: selectedPrefs });
      setProfile(data);
      setMessage('Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handlePrefChange = (deptId) => {
    if (selectedPrefs.includes(deptId)) {
      setSelectedPrefs(selectedPrefs.filter(id => id !== deptId));
    } else {
      setSelectedPrefs([...selectedPrefs, deptId]);
    }
  };

  if (loading) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your marks and select department preferences for admission.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.includes('success') ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Marks Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Academic Marks (Out of 100)</h2>
          <form id="profileForm" onSubmit={handleSaveMarks} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Physics</label>
              <input type="number" min="0" max="100" required value={marks.physics} onChange={e => setMarks({...marks, physics: e.target.value})}
                disabled={profile?.status === 'allocated'}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chemistry</label>
              <input type="number" min="0" max="100" required value={marks.chemistry} onChange={e => setMarks({...marks, chemistry: e.target.value})}
                disabled={profile?.status === 'allocated'}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mathematics</label>
              <input type="number" min="0" max="100" required value={marks.mathematics} onChange={e => setMarks({...marks, mathematics: e.target.value})}
                disabled={profile?.status === 'allocated'}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50" />
            </div>
            <div className="pt-2">
              <div className="bg-gray-50 p-3 rounded-lg border flex justify-between items-center text-sm font-semibold">
                <span>Total Merit Score:</span>
                <span className="text-blue-600 text-lg">{Number(marks.physics || 0) + Number(marks.chemistry || 0) + Number(marks.mathematics || 0)} / 300</span>
              </div>
            </div>
          </form>
        </div>

        {/* Preferences Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Department Preferences</h2>
          <p className="text-xs text-gray-500 mb-4">Select departments in your preferred order of choice. Dragging is mocked for simplicity - selection order matters.</p>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {departments.length === 0 ? <p className="text-sm text-gray-500">No departments available.</p> : null}
            {departments.map((dept) => {
              const prefIndex = selectedPrefs.indexOf(dept._id);
              const isSelected = prefIndex !== -1;
              return (
                <div 
                  key={dept._id}
                  onClick={() => profile?.status !== 'allocated' && handlePrefChange(dept._id)}
                  className={`p-3 rounded-lg border cursor-pointer transition flex items-center justify-between ${isSelected ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <div>
                    <p className="font-medium text-gray-900">{dept.name}</p>
                    <p className="text-xs text-gray-500">Cutoff: {dept.minCutoff} | Seats: {dept.availableSeats}</p>
                  </div>
                  {isSelected && (
                    <span className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {prefIndex + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          form="profileForm"
          type="submit"
          disabled={saving || profile?.status === 'allocated'}
          className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile & Preferences'}
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
