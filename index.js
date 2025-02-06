require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const User = require('./schema');

const app = express();
app.use(express.json());

// Connect to MongoDB using the DB_URI from the .env file
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// POST endpoint to add user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
