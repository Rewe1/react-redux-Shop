// Backend variables to sync the urls of get/post requests from frontend

let host = 'localhost'
let port = 8081
let url = `${host}${port ? `:${port}` : ''}`

module.exports =
{
    host,
    port,
    fetchURL: `http://${url}/fetch`,
    postURL: `http://${url}/postItem`
};
