import React, { useState } from 'react'

import LogoTwitterWhite from '../../assets/png/logo-white.png'
import LogoTwitter from '../../assets/png/logo.png'

/* Bootstrap */
import { Container, Row, Col, Button } from "react-bootstrap"

/* FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faUsers, faComment } from "@fortawesome/free-solid-svg-icons"

/* Components */
import BasicModal from "../../components/modal/BasicModal/BasicModal.jsx"
import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx"
import SignInForm from "../../components/SignInForm/SignInForm.jsx"

export default function SignInSingUp({setRefreshCheckLogin}) {

    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openModal = content => {
        setShowModal(true)
        setContentModal(content)
    }

    return (
        <>
            <Container className="sigin-signup" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent
                        openModal = {openModal}
                        setShowModal = {setShowModal}
                        setRefreshCheckLogin = {setRefreshCheckLogin}
                    />
                </Row>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    )
}

const LeftComponent = () => {
    return(
        <Col className="sigin-signup__left" xs={6}>
            <img src={LogoTwitter} alt="Twittor Logo" />
            <div className='Clase'>
                <h2> <FontAwesomeIcon icon={faSearch}/> Sigue lo que te interesa</h2>
                <h2> <FontAwesomeIcon icon={faUsers}/> Enterate de qué está hablando la gente</h2>
                <h2> <FontAwesomeIcon icon={faComment}/> Únete la conversación</h2>
            </div>
        </Col>
    )
}

const RightComponent = ({openModal, setShowModal}) => {
    return(
        <Col className="sigin-signup__right" xs={6}>
            <div>
                <img src={LogoTwitterWhite} alt="logo light twitter" />
                <h2>Mira lo que esta pasando en el mundo en este momento</h2>
                <h3>Únete a Twittor ahora mismo</h3>
                <Button
                    variant="primary"
                    onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
                >
                    Registrate</Button>
                <Button
                    variant="outline-primary"
                    onClick={() => openModal(<SignInForm setShowModal={setShowModal} />)}
                >
                    Iniciar sesión</Button>
            </div>
        </Col>
    )
}
