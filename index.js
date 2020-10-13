const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const PORT = process.env.PORT;

//routes
const rootRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// on successful connection
db.on('error', () => console.error('Database connection failed!'));

// on failed connection
db.once('open', () => console.log('Database connection successful!'));

//middleware
app.use(express.json());

app.use('/', rootRoute);
app.use('/api/user', authRoute);
app.use('/api/users', userRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
