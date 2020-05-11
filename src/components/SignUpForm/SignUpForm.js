import React, {useState} from 'react'
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation";
import { signUpApi } from "../../api/auth";

export default function SignUpForm({setShowModal}) {

    const [formData, setformData] = useState(initialFormValue())
    const [signUpLoading, setsignUpLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        let validCount = 0
        values(formData).some(value => {
            value && validCount++
            return null
        })

        if (validCount != size(formData)) {
            toast.warning("Completa todos los campos del formulario")
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Email inválido")
            } else if( formData.password !== formData.repeatPassword ) {
                toast.warning("Las contraseñas tienen que ser iguales")
            } else if( size(formData.password) < 6 ) {
                toast.warning("La contraseña tiene que tener almenos 6 caracteres")
            } else {
                setsignUpLoading(true)
                signUpApi(formData).then(res => {
                    if (res.code) {
                        toast.warning(res.message)
                    } else {
                        toast.success("Registro ha sido correcto")
                        setShowModal(false)
                        setformData(initialFormValue())
                    }
                }).catch(() => {
                    toast.error("Error del servidor, inténtelo más tarde!")
                }).finally(() => {
                    setsignUpLoading(false)
                })
            }
        }
    }

    const handleOnChange = e => {
        setformData({ ...formData, [e.target.name] : e.target.value })
    }

    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit} onChange={handleOnChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text" 
                                placeholder="Nombre"
                                name="nombre"
                                defaultValue={formData.nombre}
                                // onChange={ e => setformData({ ...formData, nombre: e.target.value }) }
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                name="apellidos"
                                defaultValue={formData.apellidos}
                                // onChange={ e => setformData({ ...formData, apellidos: e.target.value }) }
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        defaultValue={formData.email}
                        // onChange={ e => setformData({ ...formData, email: e.target.value }) }
                    />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                defaultValue={formData.password}
                                // onChange = { e => setformData({ ...formData, password: e.target.value }) }
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Confirmar contraseña"
                                name="repeatPassword"
                                defaultValue={formData.repeatPassword}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Button 
                    variant="primary"
                    type="submit"
                >
                    {!signUpLoading ? "Registrarse" : <Spinner animation="border"/> }
                </Button>
            </Form>
        </div>
    )
}


const initialFormValue = () => {
    return {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}