export default (): iAccountAction =>
{
    return {
        type: 'LOGOUT',
        payload:
        {
            _id: '',
            email: '',
        }
    }
}