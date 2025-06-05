import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4 py-12 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      {/* 404 Graphic */}
      <div className="text-indigo-400">
        <svg 
          className="mx-auto h-24 w-24" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      
      {/* Text Content */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-200 mb-2">Страница не найдена</h2>
        <p className="text-gray-400 mb-8">
          Страница, которую Вы ищете не существует, или была перемещена.
        </p>
        
        {/* Action Button */}
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <svg 
            className="-ml-1 mr-2 h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          На главную
        </Link>
      </div>
    </div>
  </div>
);