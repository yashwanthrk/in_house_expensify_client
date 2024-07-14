import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface DashboardProps {
  token: string;
}

interface Transaction {
  id: number;
  transaction_date: string;
  amount: string;
  description: string;
  category: string;
}

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/transactions/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setMessage('Error fetching transactions. Please try again.');
        }
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [token, navigate]);

  const categories = ['food', 'travel', 'shopping', 'entertainment', 'other'];
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: categories.map((category) =>
          transactions
            .filter((t) => t.category === category)
            .reduce((sum, t) => sum + parseFloat(t.amount), 0)
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div>
      <h1>Expense Dashboard</h1>
      {message && <p>{message}</p>}
      <Pie data={data} />
    </div>
  );
};

export default Dashboard;
