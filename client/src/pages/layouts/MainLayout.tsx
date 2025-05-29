import { useState } from "react";

import { CustomBtn } from "../../components/ui/CustomBtn";
import { CustomNavLink } from "../../components/ui/CustomNavLink";
import { Footer } from "../../components/ui/Footer";
import { ExitIcon, HomeIcon, BurgerIcon } from "../../components/ui/Icons";
import { useAuth } from "../../contexts/AuthContext";
import { useLogoutMutation } from "../../hooks/authQueries";



export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Mobile Sidebar (Fullscreen) */}
      <div className={`fixed inset-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden transition-transform duration-300 ease-in-out`}>
        <div className="w-full h-full bg-gray-800 flex flex-col">

          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-indigo-400">Dashboard</h2>
            <CustomBtn onClick={ () => setSidebarOpen(false) } > <ExitIcon/> </CustomBtn>
          </div>

          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            <CustomNavLink to="/dashboard" onClick={() => setSidebarOpen(false) } > 
              <HomeIcon/> Overview  
            </CustomNavLink>
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
            <CustomNavLink to="/dashboard" onClick={() => setSidebarOpen(false) } > 
              <HomeIcon/> Overview  
            </CustomNavLink>
            {/* Add more nav items as needed */}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <CustomBtn onClick={ () => setSidebarOpen(true) } className='md:hidden'> <BurgerIcon/> </CustomBtn>
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

          {/* Page Content */}
          <div className="p-6 space-y-6">
            {children}
          </div>
        </main>
      </div>

      <Footer/>
    </div>
  );
};