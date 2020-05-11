import React from 'react'
import { Modal } from "react-bootstrap";
import { Close } from "../../../utils/icons";

export default function ConfigModal({show, setShow, title, children}) {
    return (
        <Modal
            className="config-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={() => setShow(false)} />
                    <h2>{title}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
