import  { createContext, useContext, type ReactNode } from 'react';
import { useAuthQuery } from '../hooks/authQueries';
import type { IUser } from '../services/types';

interface AuthContextType {
  user: IUser | null | undefined; // undefined means we don't know yet
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useAuthQuery();
  
  // userdata and authenticated flag/ null and not-authenticated
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};