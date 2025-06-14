const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Example routes (Add your actual routes here)
app.get('/', (req, res) => {
  res.send('✅ FrameKit Backend API is Live and Operational');
});

app.get('/api/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint is working!' });
});

// TODO: Add more routes like register, branding, invoices, etc.

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
