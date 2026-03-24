import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
    <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 bg-slate-50">
            {children}
        </main>
    </div>
);

export default Layout;
