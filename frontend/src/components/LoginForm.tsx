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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#1f4037] to-[#99f2c8] relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_8s_infinite] -top-32 -left-32"></div>
      <div className="absolute w-[400px] h-[400px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_8s_infinite_2s] top-0 right-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_8s_infinite_4s] bottom-0 left-20"></div>

      {/* Login Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 tracking-wide drop-shadow-[0_0_15px_#99f2c8]">
          ⚡ Welcome to OddsPro
        </h1>

        {error && (
          <div className="bg-red-200 text-red-800 px-4 py-2 rounded mb-4 text-center font-semibold shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="peer w-full px-4 py-3 pt-6 text-white bg-transparent border border-white/30 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-white shadow-sm"
              placeholder="Username"
              required
            />
            <label
              htmlFor="username"
              className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-lime-300"
            >
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 py-3 pt-6 text-white bg-transparent border border-white/30 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-white shadow-sm"
              placeholder="Password"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-lime-300"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative overflow-hidden group w-full px-4 py-3 text-white font-bold tracking-wide bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-md"></span>
            {loading ? (
              <div className="flex items-center justify-center gap-2 z-10 relative">
                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              <span className="relative z-10">🚀 Log In</span>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-white/80 text-sm">
          Demo Login: <span className="font-semibold">admin / admin123</span>
        </p>
      </div>

      {/* Inline keyframes for animated blobs */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(40px, -30px) scale(1.05); }
            66% { transform: translate(-30px, 20px) scale(0.95); }
          }
          .animate-[blob_8s_infinite] {
            animation: blob 8s infinite;
          }
          .animate-[blob_8s_infinite_2s] {
            animation: blob 8s infinite 2s;
          }
          .animate-[blob_8s_infinite_4s] {
            animation: blob 8s infinite 4s;
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm;
