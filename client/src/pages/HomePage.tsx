import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect authenticated users away from home
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-center">
        {/* App Logo/Title */}
        <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Welcome to <span className="text-indigo-400">Our App</span>
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
            The ultimate solution for your needs. Get started by creating an account or signing in.
            </p>
        </div>

        {/* Auth Options */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <Link
            to="/login"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-center"
            >
            Sign In
            </Link>
            <Link
            to="/register"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-center"
            >
            Create Account
            </Link>
        </div>

        {/* Features Preview */}
        <div className="mt-16 w-full max-w-6xl px-4">
  <h2 className="text-2xl font-bold text-white mb-8 text-center">
    Supercharge Your Study Sessions
  </h2>
  
  {/* Improved Features Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        icon: '📚',
        title: "Course Wikis",
        description: "Comprehensive subject guides curated by top students",
        color: "bg-purple-600/20"
      },
      {
        icon: '📝',
        title: "Note Exchange",
        description: "Share and rate lecture notes with your peers",
        color: "bg-blue-600/20" 
      },
      {
        icon: '🧑‍🏫',
        title: "Study Groups",
        description: "Collaborate in real-time on tough topics",
        color: "bg-emerald-600/20"
      },
      {
        icon: '📊',
        title: "Exam Archive",
        description: "Past papers with model solutions",
        color: "bg-amber-600/20"
      }
    ].map((feature, index) => (
      <div 
        key={index}
        className={`p-6 rounded-xl border border-gray-700 hover:border-indigo-400 transition-all duration-300 ${feature.color}`}
      >
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-300">{feature.description}</p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};