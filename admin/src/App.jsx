import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CandidateList from './pages/CandidateList';
import CompanyManagement from './pages/CompanyManagement';
import MatchSystem from './pages/MatchSystem';
import MatchTracking from './pages/MatchTracking';

const AdminGuard = ({ children }) => {
    const { user } = useAuth();
    if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;
    return <Layout>{children}</Layout>;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<AdminGuard><Dashboard /></AdminGuard>} />
                    <Route path="/candidates" element={<AdminGuard><CandidateList /></AdminGuard>} />
                    <Route path="/companies" element={<AdminGuard><CompanyManagement /></AdminGuard>} />
                    <Route path="/match" element={<AdminGuard><MatchSystem /></AdminGuard>} />
                    <Route path="/matches" element={<AdminGuard><MatchTracking /></AdminGuard>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
