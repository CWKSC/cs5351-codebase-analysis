import React, { createContext, useState, useEffect, useContext } from 'react';
import config from '../config';
import axios from 'axios';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';
import { API } from '../constants/api';
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

  const handleGoogleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem('code_verifier', codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = 42; // You can implement generateRandomString similarly to codeVerifier

    const params = new URLSearchParams({
      client_id: config.googleClientId,
      redirect_uri: 'http://localhost:3000/loginCallback',
      response_type: 'code',
      scope: 'openid email profile',
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
  const handleGoogleCallback = async (code) => {

    console.log(code);
    const codeVerifier = localStorage.getItem('code_verifier');
    try {
      const response = await axios.post(API.GET_TOKEN, {
        code: code,
        codeVerifier: codeVerifier,
        redirectUri: 'http://localhost:3000/LoginCallback',
      }, { withCredentials: true });

      if (response.status === 200) {
        //assign token to local storage
        return response
      } else {
        //nothing
        console.error('Authentication failed:', response);
        return response
      }
    } catch (error) {
      //most likely server down
      console.error('Error exchanging code:', error);
      return {"status":"500"}
    }

  }

  
  const handleGithubLogin = async () => {
    const state = generateCodeVerifier();
    localStorage.setItem('github_state', state);

    const params = new URLSearchParams({
      client_id: 'Ov23lifyOYav0e5vYPEJ',
      redirect_uri: 'http://localhost:8000/login#',
      scope: 'read:user user:email',
      state: state,
      allow_signup: 'true',
    });

    window.location = `https://github.com/login/oauth/authorize?${params.toString()}`;
  };



  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      logout,
      user,
      loading,
      authError,
      handleGoogleLogin,
      handleGoogleCallback,
      handleGithubLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};