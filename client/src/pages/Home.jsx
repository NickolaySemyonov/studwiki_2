// src/pages/Home.jsx
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Если пользователь уже авторизован, перенаправляем на dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="text-center py-8">Проверка авторизации...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">MyApp</div>
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Вход
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </nav>

      {/* Основное содержимое */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Добро пожаловать в MyApp
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Современное решение для ваших задач с безопасной аутентификацией
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/login" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Начать работу
            </Link>
            <Link 
              to="/features" 
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Узнать больше
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Безопасность</h3>
            <p className="text-gray-600">
              Используем Flask-Login с защищенными HTTP-only куками для безопасной аутентификации.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Производительность</h3>
            <p className="text-gray-600">
              React SPA обеспечивает быстрый и отзывчивый интерфейс.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Простота</h3>
            <p className="text-gray-600">
              Интуитивно понятный интерфейс для удобной работы.
            </p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Технологии</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded">
              <div className="font-medium">React</div>
            </div>
            <div className="p-4 border rounded">
              <div className="font-medium">Flask</div>
            </div>
            <div className="p-4 border rounded">
              <div className="font-medium">Tailwind CSS</div>
            </div>
            <div className="p-4 border rounded">
              <div className="font-medium">Axios</div>
            </div>
          </div>
        </section>
      </main>

      {/* Футер */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} MyApp. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;