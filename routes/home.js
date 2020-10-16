const router = require('express').Router();
const verify = require('../helpers/verifyToken');
const axios = require('axios');

router.get('/', verify, (req, res) => {
    axios
        .get(' https://official-joke-api.appspot.com/jokes/ten')
        .then((axres) => res.status(200).send(axres.data));
});

router.get('/random', verify, (req, res) => {
    axios
        .get('https://private-anon-c5c22c112b-kitsu.apiary-proxy.com/api/edge/anime')
        // select only four resources from url
        .then((axres) => res.status(200).send(axres.data.data.slice(0, 4)))
        .catch((err) => console.error(err));
});

module.exports = router;
