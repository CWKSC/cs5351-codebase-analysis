import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n.js'
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './hook/AuthContext';
import AppRoutes from './routes/AppRoutes';
import 'semantic-ui-css/semantic.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config.js';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <React.StrictMode>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
