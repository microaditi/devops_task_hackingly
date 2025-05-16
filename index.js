const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String
}));

// MongoDB connection URI
const mongoURI = 'mongodb://mongodb:27017/mydb'; // Update this with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.send('OK');
});

// POST /user - Create a new user
app.post('/user', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    return res.status(201).json({
      message: 'User created successfully',
      user: { name, email }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create user.' });
  }
});


app.get('/users', async (req, res) => {
  try {
    // Retrieve all users, but only select the name and email fields
    const users = await User.find({}, 'name email');  // This specifies the fields to select

    // If no users are found, return an empty array
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }

    // Create an empty array to store extracted user data
    const userData = [];

    // Loop through the users array and extract name and email
    for (let i = 0; i < users.length; i++) {
      const user = users[i];  // Get each user object
      userData.push({
        name: user.name,
        email: user.email
      });
    }

    // Send the list of users (only name and email)
    return res.status(200).json({
      message: 'Users retrieved successfully',
      users: userData
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to retrieve users.' });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

