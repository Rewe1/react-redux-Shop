export default (account: iAccount): iAccountAction =>
{
    return {
        type: 'LOGIN',
        payload: 
        {
            ...account
        }
    }
}