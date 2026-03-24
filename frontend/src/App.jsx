import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
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
import AdminSidebar from './components/AdminSidebar';
import { useAuth } from './context/AuthContext';

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
    const { user } = useAuth();
    const location = useLocation();
    const isAdmin = user?.role === 'admin';
    const isLoginOrSignup = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/admin/login';

    return (
        <div className="min-h-screen">
          {!isLoginOrSignup && <Navbar />}
          <main className={`container mx-auto px-4 py-8 ${isAdmin ? 'flex gap-8' : ''}`}>
            {isAdmin && <AdminSidebar />}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/apply" element={<CandidateForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/candidates" element={<CandidateList />} />
                <Route path="/admin/companies" element={<CompanyManagement />} />
                <Route path="/admin/match" element={<MatchSystem />} />
                <Route path="/admin/matches" element={<MatchTracking />} />
              </Routes>
            </div>
          </main>
        </div>
    );
}

export default App;
