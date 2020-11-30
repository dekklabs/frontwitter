import React from 'react'
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation";
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../actions/auth';

export default function SignUpForm({setShowModal}) {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.ui)

    /* useForm */
    const [formValues, handleInputChange] = useForm({
        nombre : "Elizabeth",
        apellidos : "Camacho",
        email : "ecamacho@gmail.com",
        password: "123456789",
        repeatPassword: "123456789"
    })

    const { nombre, apellidos, email, password, repeatPassword } = formValues

    const onSubmit = (e) => {
        e.preventDefault()

        if( !isEmailValid(email) ) {
            toast.warning("Email inválido")
        } else if (password !== repeatPassword) {
            toast.warning("Las contraseñas deben ser iguales")
        } else if( password.length <= 6 ) {
            toast.warning("La contraseña debe ser mayor a 6 caracteres")
        } else {
            dispatch(register(formValues))
            toast.success("bien")
            setShowModal(false)
        }
    }

    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text" 
                                placeholder="Nombre"
                                name="nombre"
                                value={nombre}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                name="apellidos"
                                value={apellidos}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Confirmar contraseña"
                                name="repeatPassword"
                                value={repeatPassword}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Button 
                    variant="primary"
                    type="submit"
                >
                    { !loading ? "Registrarse" : <Spinner animation="border" />  }
                </Button>
            </Form>
        </div>
    )
}