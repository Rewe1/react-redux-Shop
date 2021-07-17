import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import serverURL from '../../../../serverURL'

import stateRoot from '../../redux'

export default function ProfilePage(props: any)
{
    const state: any = useSelector((state: tRootState) => state);
    const account: iAccount = state.account

    let [edit, setEdit] = useState(false)
    let [isDeleting, setDelete] = useState(false)
    let [success, setSuccess] = useState(false)

    let dispatch = useDispatch()

    let deleteAccount = async () =>
    {
        let res = await fetch(`/${serverURL.accounts.deletePath}`,
        {
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(
            {
                email: account.email,
                password: (document.getElementById('delete-input') as HTMLInputElement).value
            })
        })

        if(res.status === 200)
        {
            setEdit(false)
            setDelete(false)
            dispatch(stateRoot.actions.account.logout())
        }
    }

    let submitChanges = async () =>
    {
        let formData = new FormData(document.getElementById('profile-info') as HTMLFormElement)

        let res = await fetch(`/${serverURL.accounts.editPath}`,
        {
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(
            {
                email: account.email,
                phone: formData.get('phone') ? formData.get('phone') : '',
                whatsapp: formData.get('whatsapp') ? formData.get('whatsapp') : '',
                address:
                {
                    CEP: formData.get('CEP'),
                    state: formData.get('state'),
                    city: formData.get('city'),
                    district: formData.get('district'),
                    street: formData.get('street'),
                    number: formData.get('number'),
                    optional: formData.get('optional') ? formData.get('optional') : '',
                }
            })
        })

        if(res.status === 200)
        {
            setEdit(false)
            dispatch(stateRoot.actions.account.logout(true))
        }
    }

    let logout = () =>
    {
        props.setToken(false)
        dispatch(stateRoot.actions.account.logout())
    }

    return (
        <div className='profile-div'>
            {
                isDeleting &&
                <div className='delete-div'>
                    <div className='delete-popup'>
                        <button className='close-btn' onClick={() => setDelete(false)}>&#10006;</button>
                        <div>
                            <p>Essa ação é permanente, você tem certeza que quer deletar sua conta?</p>
                            <input id='delete-input' type='password' placeholder='Senha'></input>
                            <button type='button' onClick={deleteAccount}>Deletar conta</button>
                        </div>
                    </div>
                </div>
            }
            {
                account._id.length === 0 &&
                <div className='login-div'>
                    <span>You are not logged in</span>
                    <ul>
                        <li>
                            <Link to='/register-account'>Register</Link>
                        </li>
                        <li>
                            <button onClick={() => props.setLogin(true)}>Login</button>
                        </li>
                    </ul>
                </div>
            }
            {
                account._id.length != 0 &&
                <div className='profile-div'>
                    <button className='edit-button' onClick={() => setEdit(!edit)}>{edit? 'Cancelar' : 'Editar'}</button>
                    <form className='profile-info' id='profile-info'>
                        <div className='info-line'>
                            <span className='info-name'>Email:</span>
                            <span className='info-span'>{account.email}</span>
                        </div>
                        {
                            account.CNPJ != '' &&
                            <div className='info-line'>
                                <span className='info-name'>CNPJ:</span>
                                <span className='info-span'>{account.CNPJ}</span>
                            </div>
                        }
                        <div className='info-line'>
                            <span className='info-name'>Phone:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.phone}</span>
                            }
                            {
                                edit &&
                                <input name='phone' className='info-span' defaultValue={account.phone}></input>
                            }
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Whatsapp:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.whatsapp}</span>
                            }
                            {
                                edit &&
                                <input name='whatsapp' className='info-span' defaultValue={account.whatsapp}></input>
                            }
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>CEP:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.address.CEP}</span>
                            }
                            {
                                edit &&
                                <input name='CEP' className='info-span' defaultValue={account.address.CEP} required></input>
                            }
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Estado:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.address.state}</span>
                            }
                            {
                                edit &&
                                <input name='state' className='info-span' defaultValue={account.address.state} required></input>
                            }
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Cidade:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.address.city}</span>
                            }
                            {
                                edit &&
                                <input name='city' className='info-span' defaultValue={account.address.city} required></input>
                            }
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Bairro:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.address.district}</span>
                            }
                            {
                                edit &&
                                <input name='district' className='info-span' defaultValue={account.address.district} required></input>
                            }
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Rua:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.address.street}</span>
                            }
                            {
                                edit &&
                                <input name='street' className='info-span' defaultValue={account.address.street} required></input>
                            }
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Número:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.address.number}</span>
                            }
                            {
                                edit &&
                                <input name='number' className='info-span' defaultValue={account.address.number} required></input>
                            }
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Complem./Apart.:</span>
                            {
                                !edit &&
                                <span className='info-span'>{account.address.optional}</span>
                            }
                            {
                                edit &&
                                <input name='optional' className='info-span' defaultValue={account.address.optional} required></input>
                            }
                        </div>
                        {
                            edit &&
                            <button type='button' onClick={() => submitChanges()}>Enviar</button>
                        }
                    </form>
                    <button className='delete-btn' onClick={() => {setDelete(true); setEdit(false)}}>Delete account</button>
                    <button className='logout-btn' onClick={() => logout()}>Logout</button>
                </div>
            }
        </div>
    )
}