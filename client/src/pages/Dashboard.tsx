import { useAuth } from '../contexts/AuthContext';
import { RoundedAvatarIcon } from '../components/ui/Icons';
import { MainLayout } from './layouts/MainLayout';

export const Dashboard = () => {
  const { user } = useAuth();
 
  return (
    <MainLayout>
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
    </MainLayout>
  );
};