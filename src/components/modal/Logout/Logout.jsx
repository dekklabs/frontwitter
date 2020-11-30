import React from 'react'
import { Modal } from 'react-bootstrap'

export const Logout = () => {
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
                    <h2>¿Ralmente desea cerrar sessión?</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
