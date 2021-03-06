export default (keepCookies = false): iAccountAction =>
{
    if(!keepCookies)
        document.cookie = "authToken=undefined; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    
    return {
        type: 'LOGOUT',
        payload:
        {
            _id: '',
            email: '',
            CNPJ: '',
            phone: '',
            whatsapp: '',
            address:
            {
                CEP: '',
                state: '',
                city: '',
                street: '',
                number: '',
                district: '',
                optional: ''
            },
        }
    }
}