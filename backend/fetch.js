const router = require('express').Router();

router.get('/', (req, res) =>
{
    res.end('Fetch');
});

module.exports = router;