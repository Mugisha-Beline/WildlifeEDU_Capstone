// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahuje@gmail.com', 
    pass: '12345',
  },
});

// Endpoint to check payment status
app.post('/api/payments/check', async (req, res) => {
  const { accountNumber, email, amount } = req.body;

  // Here, you would integrate with your payment gateway to check if the payment has been received.
  // For demonstration purposes, we'll assume the payment is always received.
  const paymentReceived = true; // Simulate payment received

  if (paymentReceived) {
    // Send thank-you email
    const mailOptions = {
      from: 'ahuje@gmail.com',
      to: email,
      subject: 'Thank You for Your Donation!',
      text: `Thank you for your generous donation of $${amount}! Your support is greatly appreciated.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.json({ success: false, message: 'Failed to send email.' });
    }
  } else {
    return res.json({ success: false, message: 'Payment not detected.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
