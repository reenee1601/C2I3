import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can implement the logic to send a password reset email
    // For simplicity, we'll just set the isSent state to true in this example
    setIsSent(true);
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
