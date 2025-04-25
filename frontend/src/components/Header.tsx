import * as React from 'react';

const Header: React.FC = () => {
  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <header className="bg-blue-700 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Sports Odds Dashboard</h1>
        <div>
          {isAuthenticated() ? (
            <button 
              onClick={logout}
              className="px-4 py-2 text-white hover:text-blue-200 transition-colors"
            >
              Logout
            </button>
          ) : (
            <a 
              href="/" 
              className="px-4 py-2 text-white hover:text-blue-200 transition-colors"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;