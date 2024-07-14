import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CategorizeExpense from './components/CategorizeExpense';
import Dashboard from './components/Dashboard';
import './styles.css';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {token && (
            <>
              <li>
                <Link to="/categorize">Categorize Expense</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/categorize" element={<CategorizeExpense token={token} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
