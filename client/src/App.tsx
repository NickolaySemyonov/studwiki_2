import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import {Editor} from './pages/Editor'
import { ArticlesOverview } from './pages/ArticlesOverview';


function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/"  element={<HomePage/>}/>
          <Route path="/home"  element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          
          <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />
          <Route path="/editor" element={
              <ProtectedRoute>
                <Editor/>
              </ProtectedRoute>
            }
          />
          <Route path="/articles" element={
              <ProtectedRoute>
                <ArticlesOverview/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
