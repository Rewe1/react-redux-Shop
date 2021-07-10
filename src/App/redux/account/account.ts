declare global
{
    interface iAccount
    {
        _id: string,
        email: string
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
    email: ''
}

export default (state: iAccount = defaultState, action: iAccountAction) =>
{
    let newState: iAccount

    switch(action.type)
    {
        case 'LOGIN':
            newState =
            {
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