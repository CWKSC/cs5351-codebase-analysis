import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './hook/AuthContext';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path="/auth/github/callback" element={<LoginPage />} />
          {/* Other routes... */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
