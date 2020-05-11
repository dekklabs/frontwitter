import React, {useState} from 'react'

import { Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation";
import { signInApi, setTokenApi } from "../../api/auth";

export default function SignInForm({setRefreshCheckLogin}) {

    const [formData, setformData] = useState(initialFormValue)
    const [signInLoading, setSignInLoading] = useState(false)

    const handleOnSubmit = e => {
        e.preventDefault()
        
        let validCount = 0
        values(formData).some(value => {
            value && validCount++
            return null
        })

        if (size(formData) !== validCount) {
            toast.warning("Completa todos los campos del formulario")
        } else {
            if( !isEmailValid(formData.email) ) {
                toast.warning("Email enválido")
            } else {
                setSignInLoading(true)
                toast.success("Login OK")
                signInApi(formData).then(response => {
                    if( response.message ) {
                        toast.warning(response.message)
                    } else {
                        setTokenApi(response.token)
                        setRefreshCheckLogin(true)
                    }
                }).catch(() => {
                    toast.error("Error del servidor, inténtelo más tarde")
                }).finally(() => {
                    setSignInLoading(false)
                })
            }
        }
    }

    const handleOnChange = e => {
        setformData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <div className="sign-in-form" onChange={handleOnChange}>
            <h2>Entrada</h2>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Control
                        type="email" 
                        name="email"
                        placeholder="Correo electrónico"
                        defaultValue={formData.email}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Contraseña"
                        defaultValue={formData.password}
                    />
                </Form.Group>
                <Button variant="primary" type="submit"> {!signInLoading ? "Iniciar sessión" : <Spinner animation="border"/> } </Button>
            </Form>
        </div>
    )
}

const initialFormValue = () => {
    return {
        email: "",
        password: ""
    }
}