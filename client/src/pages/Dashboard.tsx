import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLogoutMutation } from '../hooks/authQueries';
import {Footer} from '../components/ui/Footer';
import { BtnExit } from '../components/ui/BtnExit';
import { HomeIcon } from '../components/ui/svg/HomeIcon';
import { BtnBurger } from '../components/ui/BtnBurger';
import { RoundedAvatarIcon } from '../components/ui/svg/RoundedAvatarIcon';

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // на всякий
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
            <BtnExit onClick={ () => setSidebarOpen(false) }/>
          </div>

          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <HomeIcon/>
              Overview
            </Link>   
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
              <HomeIcon/>
              Overview
            </Link>
            {/* Add more nav items as needed */}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <BtnBurger onClick={ () => setSidebarOpen(true) } className='md:hidden'/>
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
                  <RoundedAvatarIcon/>
                  <h3 className="font-medium">Account Info</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Email:</span> {user?.email}</p>
                  <p><span className="text-gray-400">User ID:</span> {user?.id}</p>
                  <p><span className="text-gray-400">Role:</span> <span className="text-green-400">{user?.role}</span></p>
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

      <Footer/>
    </div>
  );
};