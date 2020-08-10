const router = require('express').Router();
const items = require('./mongoDb');
const handleError = require('./handleError');

router.get('/', (req, res) =>
{
    items.find((err, resp) =>
    {
        if(err)
            handleError(err, res);
        else
            res.status(200).end(JSON.stringify(resp));
    })
});

module.exports = router;