import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen">
            <main className="container mx-auto px-4 py-8 flex gap-8">
                <AdminSidebar />
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
