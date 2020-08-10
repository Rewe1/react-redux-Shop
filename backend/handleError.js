module.exports = (err, res) =>
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
}