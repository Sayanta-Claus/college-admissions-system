import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, ShieldAlert } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const u = await login(email, password);
      
      if (isAdminMode && u.role !== 'admin') {
        logout();
        throw new Error('Invalid Admin Credentials');
      }
      
      if (!isAdminMode && u.role === 'admin') {
        logout();
        throw new Error('Please select Admin Login to access the dashboard');
      }

      navigate(u.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <div className={`p-3 rounded-full mb-3 ${isAdminMode ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
            {isAdminMode ? <ShieldAlert className="h-8 w-8" /> : <GraduationCap className="h-8 w-8" />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{isAdminMode ? 'Admin Portal' : 'Student Portal'}</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${!isAdminMode ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setIsAdminMode(false); setError(''); }}
          >
            Student
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${isAdminMode ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setIsAdminMode(true); setError(''); }}
          >
            Administrator
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-medium py-2.5 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed mt-2 ${isAdminMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        {!isAdminMode && (
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-medium">Create one</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
