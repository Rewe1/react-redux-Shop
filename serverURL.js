// Backend variables to sync the urls of get/post requests from frontend

let host = 'localhost'
let port = 8081
let url = `${host}${port ? `:${port}` : ''}`

module.exports =
{
    host,
    port,
    url,
    shopItems:
    {
        fetchPath: `shop-items/fetch`,
        postPath: `shop-items/post`,
        fetchURL: `http://${url}/shop-items/fetch`,
        postURL: `http://${url}/shop-items/post`
    }
};
