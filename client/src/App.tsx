import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ArticlesWrapper } from './pages/wrappers/ArticlesWrapper';
import { SectionsWrapper } from './pages/wrappers/SectionsWrapper';
import { EditorWrapper } from './pages/wrappers/EditorWrapper';
import { VersionWrapper } from './pages/wrappers/VersionWrapper';


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
          <Route path="/editor/:articleId?" element={
              <ProtectedRoute>
                <EditorWrapper/>
              </ProtectedRoute>
            }
          />
          <Route path="/sections/:sectionId?" element={
              <ProtectedRoute>
                <SectionsWrapper/>
              </ProtectedRoute>
            }
          />
          <Route path="/articles/:articleId?" element={
              <ProtectedRoute>
                <ArticlesWrapper/>
              </ProtectedRoute>
            }
          />
          <Route path="/version_mgr/:articleId" element={
              <ProtectedRoute>
                <VersionWrapper/>
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
