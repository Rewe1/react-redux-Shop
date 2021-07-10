import reducer from './account'

import login from './actions/login'
import logout from './actions/logout'

export default
{
    reducer,
    actions: 
    {
        login,
        logout
    }
}