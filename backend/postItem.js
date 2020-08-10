const router = require('express').Router();

const items = require('./mongoDb');
const handleError = require('./handleError');

// bodyParser parses post form data to json, which can be saved into db
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req, res) =>
{
    console.log('posting');
    items(req.body).save((err) =>
    {
        if(err)
            handleError(err, res);
        else
            res.status(200).end('Item was successfuly posted!');
    });
})

module.exports = router;