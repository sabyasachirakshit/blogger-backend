const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/Auth');

const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose.connect('mongodb://localhost/blog-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Blog App');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
