
import React, { createContext, useState, useEffect, useContext } from 'react';
import config from '../config';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';

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
        if (1 == 1) {
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

  const handleGoogleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.googleClientId,
      redirect_uri: 'http://localhost:3000/auth/google/callback',
      scope: 'openid profile email',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });
    //console.log(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
    window.location = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  const handleGithubLogin = async () => {
    const state = generateCodeVerifier();
    localStorage.setItem('github_state', state);

    const params = new URLSearchParams({
      client_id: 'YOUR_GITHUB_CLIENT_ID',
      redirect_uri: 'http://localhost:3000/auth/github/callback',
      scope: 'read:user user:email',
      state: state,
      allow_signup: 'true',
    });

    window.location = `https://github.com/login/oauth/authorize?${params.toString()}`;
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
        localStorage.setItem('user', JSON.stringify(response.data));   //data set jwt in localstorage
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading, authError, handleGoogleLogin, handleGithubLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};