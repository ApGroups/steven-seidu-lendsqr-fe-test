const fs = require('fs');
const path = require('path');

// Path to your mock database
const dbPath = path.join(__dirname, '../data/db.json');
let users = [];

// Load data from db.json
const loadData = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const jsonData = JSON.parse(data);
    users = jsonData.users; // Ensure users is assigned to the array
  } catch (error) {
    console.error('Error reading db.json:', error);
  }
};

// Initialize data
loadData();

// Handler function for the API routes
module.exports = async (req, res) => {
  if (req.method === 'GET') {
    if (req.query.index !== undefined) {
      // Endpoint to get user by index
      const userIndex = parseInt(req.query.index, 10);
      const user = users.find(u => u.index === userIndex);
      
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send('User not found');
      }
    } else {
      // Endpoint to get all users
      res.status(200).json(users);
    }
  } else if (req.method === 'POST') {
    // Endpoint to authenticate user
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      res.status(200).json(user); // Send user details or a token for authentication
    } else {
      res.status(401).send('Invalid email or password');
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
