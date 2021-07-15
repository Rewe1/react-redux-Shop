import React, {useState} from "react"
import {Link, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import serverURL from '../../../../serverURL'

export default function RegisterPage(props: any)
{
    
    let [isPassEqual, setPassEqual] = useState(true)
    let [isEmailUsed, setEmailUsed] = useState(false)
    let [success, setSuccess] = useState(false)
    
    let [isVendor, setVendor] = useState(false)

    let postRegister = async () => 
    {
        setSuccess(false)
        setEmailUsed(false)
        setPassEqual(true)

        let formData = new FormData(document.getElementById('register-form') as HTMLFormElement)

        if(formData.get('password') != formData.get('confirm-password'))
            return setPassEqual(false)

        let res = await fetch(`${serverURL.url}/${serverURL.accounts.registerPath}`, {
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
                    CEP: formData.get('CEP'),
                    state: formData.get('state'),
                    city: formData.get('city'),
                    district: formData.get('district'),
                    street: formData.get('street'),
                    number: formData.get('number'),
                    optional: formData.get('optional'),
                }
            )
        })
        if(res.status === 401)
        {
            setEmailUsed(true)
            setSuccess(false)
        }
        
        if(res.status === 200)
        {
            setEmailUsed(false)
            setPassEqual(true)
            props.setToken(true)
            setSuccess(true)
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
                    success &&
                    <Redirect to="/" />
                }
                {
                    isEmailUsed &&
                    <span className='error-span'>Email já está em uso</span>
                }
                {
                    !isPassEqual &&
                    <span className='error-span'>As senhas são diferentes</span>
                }
                <form className='register-form' id='register-form' method='post'>
                    <div className='account-id-div'>
                        <input type='email' name='email' className='email-input' placeholder='Email' required></input>
                        <input type='password' name='password' className='password-input' placeholder='Senha' required></input>
                        <input type='password' name='confirm-password' className='password-input' placeholder='Confirmar senha' required></input>
                        <label className='remember-me-label'>
                            <input type='checkbox' name='remember-me' className='remember-me-input'></input>
                            &nbsp; Manter login
                        </label>
                    </div>

                    <div className='account-info-div'>
                        <div className='account-type-div'>
                            <span>Você é</span>
                            <div className='account-type-line'>
                                <button className='account-type-btn' type="button" style={(!isVendor ? { fontWeight: 'bold'} : { fontWeight: 'normal'})} onClick={() => setVendor(false)}>
                                    &nbsp;consumidor 
                                </button>
                                <button className='account-type-btn' type="button" style={(isVendor ? { fontWeight: 'bold'} : { fontWeight: 'normal'})} onClick={() => setVendor(true)}>
                                    &nbsp;vendedor 
                                </button>
                            </div>
                        </div>
                        {
                            isVendor &&
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