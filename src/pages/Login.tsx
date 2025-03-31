import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navigation from '../components/Navigation';
import BetaAnnouncement from '../components/BetaAnnouncement';
import { Loader, LogIn, AlertTriangle } from 'lucide-react';

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const from = (location.state as any)?.from?.pathname || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      setLoading(true);
      
      await login(email, password);
      
      // Redirect to the previous page or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(t('login.errors.invalid'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-primary-lightest">
      <Navigation />
      <BetaAnnouncement />
      
      <div className="py-12">
        <div className="max-w-md mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-primary mb-6">{t('login.title')}</h1>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('login.form.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('login.form.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-light disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    {t('login.form.signingIn')}
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    {t('login.form.signIn')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;