
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null); 
  const [authError, setAuthError] = useState(null); 

  
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  const mockApiLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // Simple validation logic
        if (1==1) {
          resolve({
            status: 200,
            data: {
              username: 'admin',
              name: 'Admin User',
              token: 'abcdef123456', // Example token
            },
          });
        } else {
          reject({
            status: 401,
            message: 'Invalid username or password',
          });
        }
      }, 1000);
    });
  };

  const login = async (userData) => {
    // Before API call (checking)
    setLoading(true);
    setAuthError(null);
    try {
      const { username, password } = userData; // Destructure username and password
      const response = await mockApiLogin(username, password); // Correct

      if (response.status === 200) {
        // After API call
        setIsAuthenticated(true);
        setUser(response.data); // Correct
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(response.data));
        return response;
      } else {
        setAuthError('Login failed.');
        return response;
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      setAuthError(error.message || 'Login failed.');
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      throw error; // Re-throw to allow further handling if needed
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};