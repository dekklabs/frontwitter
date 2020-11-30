import React from 'react'

import { Form, Button, Spinner } from "react-bootstrap";
import { useForm } from '../../hooks/useForm';
import { isEmailValid } from '../../utils/validation';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';

export default function SignInForm({setShowModal}) {

    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.ui)

    const [formValue, handleInputChange] = useForm({
        email: "vdias@gmail.com",
        password: "123456789"
    })

    const { email, password } = formValue

    const handleOnSubmit = e => {
        e.preventDefault()
        
        if( !isEmailValid(email) ) {
            toast.warning("Debe ingresar un correo válido")
        } else { 
            toast.success("Correcto")
            dispatch(login(formValue))
            setShowModal(true)
        }
    }

    return (
        <div className="sign-in-form">
            <h2>Entrada</h2>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Control
                        type="email" 
                        name="email"
                        value={email}
                        placeholder="Correo electrónico"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="password" 
                        name="password"
                        value={password}
                        placeholder="Contraseña"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">{!loading ? 'Iniciar sessión' : <Spinner animation="border" />}</Button>
            </Form>
        </div>
    )
}