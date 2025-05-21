import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: '' // Поле для подтверждения пароля
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Некорректный email';
    
    if (!formData.nickname) newErrors.nickname = 'Никнейм обязателен';
    
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 6) newErrors.password = 'Минимум 6 символов';
    
    if (formData.password !== formData.password2) {
      newErrors.password2 = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsSubmitting(true);
  
  try {
    const { data } = await api.post('/register', {
      email: formData.email,
      password: formData.password,
      password2: formData.password2,
      nickname: formData.nickname
    });

    if (data.success) {
      // 1. Проверяем куки вручную
      const hasSession = document.cookie.includes('session');
      console.log('Cookies:', document.cookie, 'Has session:', hasSession);
      
      // 2. Делаем дополнительный запрос для проверки авторизации
      const authCheck = await api.get('/check_auth');
      console.log('Auth check:', authCheck.data);
      
      // 3. Перенаправляем только после подтверждения
      if (authCheck.data.authenticated) {
        navigate('/dashboard');
      } else {
        setErrors({ api: 'Сессия не создана' });
      }
    }
  } catch (error) {
    console.error('Registration error:', error);
    setErrors({ api: error.response?.data?.message || 'Ошибка регистрации' });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Регистрация</h2>
      
      {errors.api && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errors.api}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле Email */}
        <div>
          <label className="block mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Поле Никнейм */}
        <div>
          <label className="block mb-1">Никнейм*</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.nickname ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}
        </div>

        {/* Поле Пароль */}
        <div>
          <label className="block mb-1">Пароль*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Поле Подтверждение пароля */}
        <div>
          <label className="block mb-1">Подтвердите пароль*</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.password2 ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password2 && <p className="text-red-500 text-sm">{errors.password2}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}

export default Register;