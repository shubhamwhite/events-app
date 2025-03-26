import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true'); // Store in localStorage
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove authentication
    setIsAuthenticated(false);
    window.location.reload(); // Refresh page to move back to login
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} /> // Pass logout function to Dashboard
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
