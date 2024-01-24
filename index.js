const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const accountRouter = require('./routers/account');
const financialRouter = require('./routers/financial');
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using promises
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your Express app after successfully connecting to MongoDB
    app.listen(3009, () => {
      console.log('Server is running on port 3009');
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));
app.use('/v1/account', accountRouter);
app.use('/v1/financial', financialRouter);

app.get('/api', (req, res) => {
  res.status(200).json('success');
});

// Close the MongoDB connection when the Node.js process is terminated
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});
