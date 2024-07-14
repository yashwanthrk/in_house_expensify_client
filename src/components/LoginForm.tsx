import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const LoginForm: React.FC<{ setToken: (token: string | null) => void }> = ({ setToken }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login/', { email, password });
      setMessage('Login successful!');
      console.log('Logged in:', response.data);
      // Store the token in local storage or context
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setToken(response.data.access);  // Set token in state
      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.detail || 'Login failed. Please try again.';
        setMessage(errorMessage);
      } else {
        setMessage('Login failed. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
