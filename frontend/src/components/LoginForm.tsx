import React, { useState } from 'react';
import { login } from '../services/api';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden p-4">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Animated Odds Ticker */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-blue-900/70 to-purple-900/70 overflow-hidden border-b border-gray-800/50">
        <div className="flex items-center h-full whitespace-nowrap animate-[ticker_30s_linear_infinite]">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-8 text-sm font-mono text-blue-300">⚽ Liverpool 1.85</span>
              <span className="mx-8 text-sm font-mono text-green-300">🏀 Celtics 2.10</span>
              <span className="mx-8 text-sm font-mono text-purple-300">🎾 Djokovic 1.45</span>
              <span className="mx-8 text-sm font-mono text-yellow-300">🏎️ Verstappen 1.30</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Card Header */}
        <div className="relative h-32 bg-gradient-to-r from-blue-900/50 to-purple-900/50 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2 tracking-tight">
                ODDS<span className="font-light">PRO</span>
              </h1>
              <p className="text-sm text-blue-200/80 font-mono">PREMIUM BETTING ANALYTICS</p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 pt-6">
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-900/40 border border-red-700/50 rounded-lg text-red-200 text-sm font-medium flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="peer w-full px-4 py-3 pl-11 bg-gray-800/70 border border-gray-700 rounded-lg text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                placeholder="Username"
                required
              />
              <label
                htmlFor="username"
                className="absolute left-11 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Username
              </label>
              <div className="absolute left-3 top-3 text-gray-500 peer-focus:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="group relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 py-3 pl-11 bg-gray-800/70 border border-gray-700 rounded-lg text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                placeholder="Password"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-11 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-400"
              >
                Password
              </label>
              <div className="absolute left-3 top-3 text-gray-500 peer-focus:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl active:scale-95 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>ACCESS ODDS PORTAL</span>
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <p className="text-center text-sm text-gray-500">
              Demo credentials: <span className="text-blue-400 font-mono">admin</span> / <span className="text-blue-400 font-mono">admin123</span>
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-3 bg-gray-900/50 border-t border-gray-800/50 text-center">
          <p className="text-xs text-gray-500 font-mono tracking-wider">
            SECURE CONNECTION • LIVE ODDS • {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Animated floating odds bubbles */}
      <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold animate-[float_8s_ease-in-out_infinite]">
        1.85
      </div>
      <div className="absolute top-1/4 left-10 w-14 h-14 rounded-full bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold animate-[float_10s_ease-in-out_infinite_2s]">
        2.10
      </div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full bg-green-600/20 backdrop-blur-sm border border-green-500/30 flex items-center justify-center text-green-300 font-bold animate-[float_12s_ease-in-out_infinite_4s]">
        3.45
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm;
