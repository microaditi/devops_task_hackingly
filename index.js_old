// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// GET /health
app.get('/health', (req, res) => {
  res.send('OK');
});

// POST /user
app.post('/user', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // In a real app, you'd save the user to a database here.
  return res.status(201).json({
    message: 'User created successfully',
    user: { name, email }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
