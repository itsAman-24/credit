const express = require('express');
const app = express();
const connectToDb = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./routes/user.route');
const cardRoutes = require('./routes/card.route');
const cookieParser = require("cookie-parser");


connectToDb();

// Serve React static files
app.use(express.static(path.join(__dirname, 'build')));

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Catch-all route to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);


module.exports = app;