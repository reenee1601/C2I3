import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending password reset request...');
      // Send a POST request to your backend API to initiate password reset
      await axios.post('http://localhost:8000/users/forgotpassword', { email });

      console.log('Password reset request successful.');
      // Set the isSent state to true upon successful request
      setIsSent(true);
    } catch (error) {
      console.error('Error sending password reset request:', error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {!isSent ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Password reset link has been sent to your email. Please check your inbox.</p>
      )}
    </div>
  );
};

export default ForgotPassword;
