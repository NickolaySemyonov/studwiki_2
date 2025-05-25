import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLogoutMutation } from '../hooks/authQueries';

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="dashboard">
        <h2>Please log in to access the dashboard</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Mobile Sidebar (Fullscreen) */}
      <div className={`fixed inset-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden transition-transform duration-300 ease-in-out`}>
        <div className="w-full h-full bg-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-indigo-400">Dashboard</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </Link>
            {/* Add more nav items as needed */}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Desktop Sidebar (Original) */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:block">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-indigo-400">Dashboard</h2>
          </div>
          <nav className="p-4 space-y-2">
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </Link>
            {/* Add more nav items as needed */}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                className="md:hidden text-gray-400 hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl font-semibold">Hello, <span className="text-indigo-400">{user?.nickname || 'User'}</span> 👋</h1>
            </div>
            <button
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="flex items-center px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-2">Welcome to your Dashboard</h2>
              <p className="text-gray-400">Here's what's happening with your account today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* User Info Card */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-medium">Account Info</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Email:</span> {user?.email}</p>
                  <p><span className="text-gray-400">User ID:</span> {user?.id}</p>
                  <p><span className="text-gray-400">Status:</span> <span className="text-green-400">Active</span></p>
                </div>
              </div>
              {/* Add more stat cards as needed */}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity yet</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sticky Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-4 mt-auto">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} StudWiki 2.0.</p>
        </div>
      </footer>
    </div>
  );
};