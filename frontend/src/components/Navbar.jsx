import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Users, LayoutDashboard, Settings, Sun, Moon } from 'lucide-react';
import logoUrl from '../assets/Jadavpur_University_Logo.svg.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm border-b dark:border-slate-800 transition-colors duration-200">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <img src={logoUrl} alt="Jadavpur University Logo" className="h-8 w-8" />
          <span>JU Admissions</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {user && (
            <div className="flex items-center gap-6 border-l dark:border-slate-700 pl-4 ml-2">
              <div className="flex items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                {user.role === 'admin' ? (
                  <>
                    <Link to="/admin" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link to="/admin/departments" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      <Settings className="h-4 w-4" /> Departments
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link to="/result" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
                      <Users className="h-4 w-4" /> Result
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold dark:text-gray-200">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
