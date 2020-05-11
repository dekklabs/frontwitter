import React, {useState} from 'react'
import { 
    Modal,
    Form,
    Button
} from "react-bootstrap";
import { addTweetApi } from "../../../api/tweet"
import {toast} from 'react-toastify'
import { Close } from "../../../utils/icons"
import classNames from "classnames"

export default function TweetModal({show, setShow}) {

    const [message, setMessage] = useState("")
    const maxLength = 259

    const handleOnSubmit = e => {
        e.preventDefault()
        if (message.length > 0 && message.length <= maxLength) {
            addTweetApi(message).then(response => {
                if( response.code >= 200 && response.code < 300 ) {
                    toast.success(response.message)
                    setShow(false)
                    window.location.reload()
                }
            })
            .catch(() => {
                toast.warning("Error al enviar el tweet, intentelo más tarde")
            })
        }
    }

    return (
        <Modal
            className="tweet-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={() => setShow(false)}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Control
                        as="textarea"
                        rows="6"
                        placeholder="¿En qué estas pensando?"
                        onChange={e => setMessage(e.target.value)}
                    />
                    <span className={classNames("count", { error: message.length > maxLength })}>
                        {message.length}/259
                    </span>
                    <Button
                        type="submit"
                        disabled={message.length > maxLength || message.length < 1}
                    >Twitear</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
