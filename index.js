const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://shivanshyadav50:YGYfZI0g2KjzLMi6@cluster0.zfl8sh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
