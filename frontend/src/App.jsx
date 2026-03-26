import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CandidateForm from './pages/CandidateForm';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import CandidateList from './pages/Admin/CandidateList';
import CompanyManagement from './pages/Admin/CompanyManagement';
import MatchSystem from './pages/Admin/MatchSystem';
import MatchTracking from './pages/Admin/MatchTracking';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

const AppContent = () => {
    const location = useLocation();
    const { user } = useAuth();
    const isAdminPage = location.pathname.startsWith('/admin');
    const isAuthPage = ['/login', '/signup'].includes(location.pathname);

    return (
        <div className="min-h-screen">
            {!isAdminPage && !isAuthPage && user && <Navbar />}
            <main className={isAdminPage && location.pathname !== '/admin/login' ? '' : 'container mx-auto px-4 py-8'}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected User Routes */}
                    <Route path="/apply" element={<ProtectedRoute><CandidateForm /></ProtectedRoute>} />
                    <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                    {/* Admin Login (no layout) */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* Protected Admin Routes (with AdminLayout) */}
                    <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/candidates" element={<AdminRoute><AdminLayout><CandidateList /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/companies" element={<AdminRoute><AdminLayout><CompanyManagement /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/match" element={<AdminRoute><AdminLayout><MatchSystem /></AdminLayout></AdminRoute>} />
                    <Route path="/admin/matches" element={<AdminRoute><AdminLayout><MatchTracking /></AdminLayout></AdminRoute>} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
