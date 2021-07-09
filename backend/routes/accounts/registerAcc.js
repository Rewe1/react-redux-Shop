const router = require('express').Router();
const accountModel = require('../../mongoDB').accounts;
let serverURL = require('../../../serverURL')
let hashPassword = require('../../bcryptjs')
var bcrypt = require('bcryptjs');

// bodyParser parses post form data to json, which can be saved into db
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req, res) =>
{
    const newAcc = req.body

    bcrypt.hash(newAcc.password, 10, (err, hash) => 
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            console.exception(exc)
            res.status(500).end()
        }

        newAcc.password = hash

        accountModel(newAcc).save((err) =>
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
                res.status(200).redirect(`http://${serverURL.host}:8080/`)
        })
    })
})

module.exports = router;