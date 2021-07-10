export default (account: iAccount): iAccountAction =>
{
    window.sessionStorage.setItem('account', JSON.stringify(account))
    return {
        type: 'LOGIN',
        payload: 
        {
            ...account
        }
    }
}