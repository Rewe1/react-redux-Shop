export default (): iAccountAction =>
{
    window.sessionStorage.removeItem('account')
    return {
        type: 'LOGOUT',
        payload:
        {
            _id: '',
            email: '',
        }
    }
}