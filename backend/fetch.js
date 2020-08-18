const router = require('express').Router();
const items = require('./mongoDb');
const handleError = require('./handleError');

router.get('/', (req, res) =>
{
    console.log('Fetching');
    items.find((err, resp) =>
    {
        if(err)
        {
            handleError(err, res);
        }
        else
        {
            console.log('Fetched')
            res.status(200).end(JSON.stringify(resp));
        }
    })
});

module.exports = router;