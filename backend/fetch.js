const router = require('express').Router();
const items = require('./mongoDb');

router.get('/', (req, res) =>
{
    items.find((err, data) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            console.error(exc);
            if(res)
                res.status(500).end();
        }
            res.status(200).end(JSON.stringify(data));
    })
});

module.exports = router;