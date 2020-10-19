const express = require('express');
var cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

app.use(cors());

dotenv.config();

const PORT = process.env.PORT;

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// on successful connection
db.on('error', () => console.error('Database connection failed!'));

// on failed connection
db.once('open', () => console.log('Database connection successful!'));

//middleware
app.use(express.json());

// route middleware
app.use('/api', require('./routes/home'));
app.use('/api/user', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
