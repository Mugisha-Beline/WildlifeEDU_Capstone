// src/pages/Payment.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import './Donate.css';

const Payment = () => {
  const paymentOptions = [
    { id: 1, name: "Credit Card", description: "Visa, MasterCard, Discover", icon: "/creditcard.png" },
    { id: 2, name: "PayPal", description: "Secure payments with PayPal", icon: "/paypal.png" },
    { id: 3, name: "Google Pay", description: "Pay easily with Google Pay", icon: "/googlepay.png" },
    { id: 4, name: "Apple Pay", description: "Fast and easy payments with Apple Pay", icon: "/applepay.png" },
    { id: 5, name: "Bank Transfer", description: "Direct transfer from your bank", icon: "/banktransfer.jpg" },
    { id: 6, name: "Venmo", description: "Send money using Venmo", icon: "/venmo.png" },
    { id: 7, name: "Zelle", description: "Quick payments with Zelle", icon: "/zelle.jpg" },
    { id: 8, name: "Cash App", description: "Send money easily with Cash App", icon: "/cashapp.png" },
    { id: 9, name: "Cryptocurrency", description: "Bitcoin, Ethereum, and more", icon: "/cryptocurrency.jpg" },
    { id: 10, name: "Gift Card", description: "Use gift cards for your donation", icon: "/giftcard.jpg" },
  ];

  return (
    <div className="paymentpage">
    <div>
    <div className="payment">
      <h2>Select Your Payment Method</h2>
      <p>Choose one of the following options to complete your donation:</p>

      <div className="payment-cards">
        {paymentOptions.map((option) => (
          <div key={option.id} className="payment-card">
            <img src={option.icon} alt={option.name} className="payment-icon" />
            <h3>{option.name}</h3>
            <p>{option.description}</p>
            <Link to="/Donate" className="pay-button">Choose</Link>
          </div>
        ))}
      </div>
      </div>
    </div>
    </div>
  );
};

export default Payment;
