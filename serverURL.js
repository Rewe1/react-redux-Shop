// Backend variables to sync the urls of get/post requests from frontend

let host = 'localhost'
let port = 8080
let url = `http://${host}${port ? `:${port}` : ''}`

module.exports =
{
    host,
    port,
    url,
    shopItems:
    {
        fetchPath: `shop-items/fetch`,
        postPath: `shop-items/post`,
        fetchURL: `${url}/shop-items/fetch`,
        postURL: `${url}/shop-items/post`
    },
    accounts:
    {
        registerPath: `accounts/register`,
        loginPath: `accounts/login`
    }
};
