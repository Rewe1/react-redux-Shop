const router = require('express').Router();
const accountSchema = require('../../mongoDB').account;
const serverURL = require('../../serverURL')

// bodyParser parses post form data to json, which can be saved into db
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req, res) =>
{
    accountSchema(req.body).save((err) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            console.error(exc);
            res.status(500).end('An error occurred :c');
        }
            res.status(200).redirect(`http://${serverURL.host}:8080/postItem`)
    });
})

module.exports = router;