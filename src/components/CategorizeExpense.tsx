import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

interface CategorizeExpenseProps {
  token: string;
}

const CategorizeExpense: React.FC<CategorizeExpenseProps> = ({ token }) => {
  const [text, setText] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        '/categorize/',
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(res.data);
      setMessage('Categorization successful!');
    } catch (error) {
      setMessage('Categorization failed. Please try again.');
      console.error('Categorization error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Categorize Expense</h2>
        {message && <p>{message}</p>}
        <textarea value={text} onChange={handleChange} required />
        <button type="submit">Categorize</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default CategorizeExpense;
