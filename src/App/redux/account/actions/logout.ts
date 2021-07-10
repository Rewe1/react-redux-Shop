export default (account: iAccount): iAccountAction =>
{
    return {
        type: 'LOGOUT',
        payload:
        {
            ...account
        }
    }
}