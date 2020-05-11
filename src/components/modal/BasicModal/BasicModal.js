import React from 'react'

import { Modal } from 'react-bootstrap'
import LogoTwitterWhite from '../../../assets/png/logo-white.png'

export default function BasicModal({ show, setShow, children }) {
    return (
        <Modal
            className="basic-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <img src={LogoTwitterWhite} alt="Logo twitter"/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
