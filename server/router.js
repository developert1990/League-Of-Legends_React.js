const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('LOL server is up and running' + process.env.PORT);
});

module.exports = router;