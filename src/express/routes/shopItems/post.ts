const items = require('../../mongoDB').items;

// bodyParser parses post form data to json, which can be saved into db
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, (req: any, res: any) =>
{
    items(req.body).save((err: Error) =>
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