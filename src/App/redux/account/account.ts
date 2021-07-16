declare global
{
    interface iAccount
    {
        _id: string,
        email: string,
        CNPJ: string,
        phone: string,
        whatsapp: string,
        address:
        {
            CEP: string,
            state: string,
            city: string,
            district: string,
            street: string,
            number: string,
            optional: string
        },
    }

    interface iAccountAction
    {
        type: string
        payload: iAccount
    }
}

let defaultState: iAccount =
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
        district: '',
        street:'',
        number: '',
        optional: ''
    },
}

export default (state: iAccount = defaultState, action: iAccountAction) =>
{
    let newState: iAccount

    switch(action.type)
    {
        case 'LOGIN':
            newState =
            {
                ...defaultState,
                ...action.payload
            }
            return newState
            
        case 'LOGOUT':
            newState = defaultState
            return newState

        default:
            return state
    }
}