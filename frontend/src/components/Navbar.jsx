import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, GraduationCap, Users, LayoutDashboard, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <GraduationCap className="h-6 w-6" />
          <span>EduAdmissions</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
            {user.role === 'admin' ? (
              <>
                <Link to="/admin" className="flex items-center gap-1 hover:text-blue-600 transition">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <Link to="/admin/departments" className="flex items-center gap-1 hover:text-blue-600 transition">
                  <Settings className="h-4 w-4" /> Departments
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-600 transition">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <Link to="/result" className="flex items-center gap-1 hover:text-blue-600 transition">
                  <Users className="h-4 w-4" /> Result
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l">
            <span className="text-sm font-semibold">{user.name}</span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium transition"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
