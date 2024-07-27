// src/server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8000;

const dbPath = path.join(__dirname, '../../data/db.json');
let users = [];

// Enable CORS
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Load data from db.json
const loadData = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const jsonData = JSON.parse(data);
    users = jsonData.users; // Ensure users is assigned to the array
    console.log('Loaded users:', users); // Debug output
  } catch (error) {
    console.error('Error reading db.json:', error);
  }
};

// Initialize data
loadData();

// Endpoint to get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint to get user by index
app.get('/users/:index', (req, res) => {
  const userIndex = parseInt(req.params.index, 10);
  const user = users.find(u => u.index === userIndex);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Endpoint to authenticate user
app.post('/users', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json(user); // Send user details or a token for authentication
  } else {
    res.status(401).send('Invalid email or password');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
