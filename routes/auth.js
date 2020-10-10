const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details);

    // check if user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send('User already exists in the database');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details);

    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Sorry that email doesn't exist`);

    // verify password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('The password is invalid');

    // assign token
    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.TOKEN_SECRET);
    res.header('token', token).send(token);
});

module.exports = router;
