import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/AdminDashboard';
import DepartmentManagement from './pages/DepartmentManagement';

// Protected Route Component
const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" replace />;
  
  return children;
};

// Root Redirect Component
const RootRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return user.role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />;
};

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute roleRequired="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/result" element={
            <ProtectedRoute roleRequired="student">
              <ResultPage />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/departments" element={
            <ProtectedRoute roleRequired="admin">
              <DepartmentManagement />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
