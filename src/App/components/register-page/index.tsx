import React, {useState} from "react"
import {Link, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import serverURL from '../../../../serverURL'

let popups =
{
    NONE: '',
    PASSWORD_REQ: 'PASSWORD_REQ',
    UNEQUAL_PASS: 'UNEQUAL_PASS',
    USED_EMAIL: 'USED_EMAIL'
}

export default function RegisterPage(props: any)
{
    let initialState =
    {
        success: false,
        isVendor: false,
        currentPopup: popups.NONE
    }
    let [state, setState] = useState(initialState)

    let passwordOnChange = () =>
    {
        let formData = new FormData(document.getElementById('register-form') as HTMLFormElement)
        let password = formData.get('password').toString()
        
        if(password.match(/(?=.*[0-9])(?=.*[a-zA-Z]).{8,}/))
        setState({...state, currentPopup: popups.NONE})
        else
        setState({...state, currentPopup: popups.PASSWORD_REQ})
    }
    
    let cPassOnChange = () =>
    {
        let formData = new FormData(document.getElementById('register-form') as HTMLFormElement)
        if(formData.get('password') != formData.get('confirm-password'))
            setState({...state, currentPopup: popups.UNEQUAL_PASS})
        else
            setState({...state, currentPopup: popups.NONE})
    }
    
    let postRegister = async () => 
    {
        let formData = new FormData(document.getElementById('register-form') as HTMLFormElement)
        setState({...state, success: false, currentPopup: popups.NONE})

        if(!(formData.get('password').toString().match(/(?=.*[0-9])(?=.*[a-zA-Z]).{8,}/)))
        {
            return setState({...state, currentPopup: popups.PASSWORD_REQ})
        }

        if(formData.get('password') != formData.get('confirm-password'))
            return setState({...state, currentPopup: popups.UNEQUAL_PASS})

        let res = await fetch(`/${serverURL.accounts.registerPath}`, {
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(
                {
                    rememberMe: formData.get('remember-me'),
                    CNPJ: formData.get('CNPJ') ? formData.get('CNPJ') : '',
                    email: formData.get('email'),
                    password: formData.get('password'),
                    phone: formData.get('phone'),
                    whatsapp: formData.get('whatsapp'),
                    address:
                    {
                        CEP: formData.get('CEP'),
                        state: formData.get('state'),
                        city: formData.get('city'),
                        district: formData.get('district'),
                        street: formData.get('street'),
                        number: formData.get('number'),
                        optional: formData.get('optional'),
                    }
                }
            )
        })
        if(res.status === 409)
        {
            setState({...state, currentPopup: popups.USED_EMAIL, success: false})
        }

        if(res.status === 400)
        {
            setState({...state, currentPopup: popups.PASSWORD_REQ})
        }
        
        if(res.status === 200)
        {
            setState({...state, currentPopup: popups.NONE})
            props.setToken(true)
            setState({...state, success: true})
        }
    }

    return(
        <div className='register-page-div'>
            <div className='banner-div'>
                <div>
                    <h2>Consumidor</h2>
                    <p>Encontre todos os mercados fazendo entrega no seu endereço e economize seu dinheiro!</p>
                </div>
                <div>
                    <h2>Vendedor</h2>
                    <p>Venda seus produtos para todos clientes na sua área de entrega!</p>
                </div>
            </div>
            <div className='form-div'>
                {
                    state.success &&
                    <Redirect to="/" />
                }
                <form className='register-form' id='register-form' method='post'>
                    <div className='account-id-div'>
                        <div className='input-div'>
                            <input type='email' name='email' className='email-input' placeholder='Email' required></input>
                            {
                                state.currentPopup === popups.USED_EMAIL &&
                                <div className='input-popup-div'>
                                    <p>Este email já está em uso.</p>
                                </div>
                            }
                        </div>
                        <div className='input-div'>
                            <input type='password' name='password' className='password-input' placeholder='Senha' onChange={passwordOnChange} pattern='(?=.*[0-9])(?=.*[a-zA-Z]).{8,}' required></input>
                            {
                                state.currentPopup === popups.PASSWORD_REQ &&
                                <div className='input-popup-div'>
                                    <p>A senha precisa de pelo menos uma letra e um número e conter no mínimo oito caracteres.</p>
                                </div>
                            }
                        </div>
                        <div className='input-div'>
                            <input type='password' name='confirm-password' placeholder='Confirmar senha' onChange={cPassOnChange} required></input>
                            {
                                state.currentPopup === popups.UNEQUAL_PASS &&
                                <div className='input-popup-div'>
                                    <p>As senhas são diferentes</p>
                                </div>
                            }
                        </div>
                        <label className='remember-me-label'>
                            <input type='checkbox' name='remember-me' className='remember-me-input'></input>
                            &nbsp; Manter login
                        </label>
                    </div>

                    <div className='account-info-div'>
                        <div className='account-type-div'>
                            <span>Você é</span>
                            <div className='account-type-line'>
                                <button className='account-type-btn' type="button" style={(!state.isVendor ? { fontWeight: 'bold'} : { fontWeight: 'normal'})} onClick={() => setState({...state, isVendor: false})}>
                                    &nbsp;consumidor 
                                </button>
                                <button className='account-type-btn' type="button" style={(state.isVendor ? { fontWeight: 'bold'} : { fontWeight: 'normal'})} onClick={() => setState({...state, isVendor: true})}>
                                    &nbsp;vendedor 
                                </button>
                            </div>
                        </div>
                        {
                            state.isVendor &&
                            <input type='text' name='CNPJ' className='cnpj-input' placeholder='CNPJ'></input>
                        }
                        <div className='input-line'>
                            <input type='text' name='phone' className='phone-input' placeholder='Telefone'></input>
                            <input type='text' name='whatsapp' className='whatsapp-input' placeholder='Whatsapp'></input>
                        </div>

                        <div className='location-info'>
                            <input type='text' name='CEP' className='cep-input' placeholder='CEP'></input>
                            <div className='input-line'>
                                <input type='text' name='state' className='state-input' placeholder='Estado'></input>
                                <input type='text' name='city' className='city-input' placeholder='Cidade'></input>
                            </div>
                            <div className='input-line'>
                                <input type='text' name='district' className='district-input' placeholder='Bairro'></input>
                                <input type='text' name='street' className='street-input' placeholder='Rua'></input>
                            </div>
                            <div className='input-line'>
                                <input type='text' name='number' className='number-input' placeholder='Número'></input>
                                <input type='text' name='optional' className='optional-input' placeholder='Andar/Apartamento'></input>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='btn-div'>
                    <button className='submit-btn' onClick={() => postRegister()}>Registrar-se</button>
                </div>
            </div>
        </div>
    )
}