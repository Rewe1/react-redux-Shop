// Backend variables to sync the urls of get/post requests from frontend

let host = '192.168.1.7'
let port = 8081
let url = `${host}${port ? `:${port}` : ''}`

module.exports =
{
    host,
    port,
    fetchURL: `http://${url}/fetch`,
    postURL: `http://${url}/postItem`
};
