import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export default function ProfilePage()
{
    const state: any = useSelector((state: tRootState) => state);
    const account: iAccount = state.account

    return (
        <div className='profile-div'>
            {
                account._id.length === 0 &&
                <div className='login-div'>
                    <span>You are not logged in</span>
                    <ul>
                        <li>
                            <Link to='/register-account'>Register</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                    </ul>
                </div>
            }
            {
                account._id.length != 0 &&
                <div className='profile-info'>
                    <div className='email-div'>
                        <span className='email-span'>Email:</span>
                        <span className='email-span'>{account.email}</span>
                    </div>
                </div>
            }
        </div>
    )
}