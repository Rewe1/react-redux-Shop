declare global
{
    interface iAccount
    {
        email: string
    }

    interface iAccountAction
    {
        type: string
        payload:
        {
            email: string
        }
    }
}

export default (state: iAccount, action: iAccountAction) =>
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
            newState = null
            return newState

        default:
            return state
    }
}