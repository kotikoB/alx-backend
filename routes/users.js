const router = require('express').Router();
const verify = require('../helpers/verifyToken');

router.get('/', verify, (req, res) => {
    // Access to the user from request is enabled by the verified token
    res.status(200).send({ user: req.user, msg: 'These are the users' });
});

module.exports = router;
