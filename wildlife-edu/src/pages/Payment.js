// src/pages/Donate.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './Payment.css';

const Donate = () => {
  const [customAmount, setCustomAmount] = useState('');

  const donationOptions = [
    { id: 1, amount: 10, description: "Support Wildlife Rescue" },
    { id: 2, amount: 25, description: "Contribute to Conservation Efforts" },
    { id: 3, amount: 50, description: "Sponsor a Wildlife Education Program" },
    { id: 4, amount: 100, description: "Become a Wildlife Advocate" },
  ];

  return (
    <div className="paymentpage">
      <div className="donate">
        <h2>Support Wildlife Conservation</h2>
        <p>Your contributions help us protect wildlife and their habitats. Choose a donation option below:</p>

        <div className="donation-cards">
          {donationOptions.map((option) => (
            <div key={option.id} className="donation-card">
              <h3>{`$${option.amount}`}</h3>
              <p>{option.description}</p>
              <Link 
                to={{
                  pathname: "/Pay",
                  state: { amount: option.amount } // Pass the selected amount to Pay.js
                }} 
                className="donate-button">
                Donate Now
              </Link>
            </div>
          ))}
        </div>

        {/* Custom Donation Input */}
        <div className="custom-donation">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter your preferred amount"
            min="1"
          />
          <Link 
            to={{
              pathname: "/Pay",
              state: { amount: customAmount } // Pass the custom amount to Pay.js
            }} 
            className="donate-button">
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Donate;
