// src/pages/Pay.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import './Pay.css';

const Pay = () => {
  const location = useLocation();
  const amount = location.state?.amount; // Get the amount from the passed state
  const [accountNumber, setAccountNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();

    if (accountNumber && email) {
      try {
        // Replace with your backend endpoint
        const response = await fetch('http://localhost:5000/api/payments/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accountNumber, email, amount }),
        });

        const data = await response.json();
        
        // Check the response from the server
        if (data.success) {
          setNotification(`Thank you! A notification has been sent to ${email}. Amount: $${amount}`);
          setAccountNumber('');
          setEmail('');
        } else {
          setNotification('Payment not detected. Please check your account number.');
        }
      } catch (error) {
        console.error('Error:', error);
        setNotification('There was an error processing your payment. Please try again.');
      }
    } else {
      setNotification('Please enter a valid account number and email.');
    }
  };

  return (
    <div className="pay-page">
      <h2>Make a Donation</h2>
      {amount && <p>You are donating: <strong>${amount}</strong></p>}
      <form onSubmit={handlePayment} className="payment-form">
        <div className="form">
          <label htmlFor="account-number">Account Number:</label>
          <input
            type="text"
            id="account-number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter your account number"
            required
          />
        </div>
        <div className="form">
          <label htmlFor="email">Email for Notification:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" className="send-button">Send</button>
      </form>
      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default Pay;
