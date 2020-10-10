const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const PORT = process.env.PORT;

//routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('connected to db')
);

//middleware
app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/users', userRoute);

app.listen(3001, () => console.log(`Listening on port 3001...`));
