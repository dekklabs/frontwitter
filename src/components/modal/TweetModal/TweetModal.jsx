import React, {useState} from 'react'
import { 
    Modal,
    Form,
    Button
} from "react-bootstrap";
import {toast} from 'react-toastify'
import { Close } from "../../../utils/icons"
import classNames from "classnames"
import { useDispatch } from 'react-redux';
import { addTweetUser } from '../../../actions/tweet/addTwetUser';

export default function TweetModal({show, setShow}) {

    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const maxLength = 259

    const handleOnSubmit = async e => {
        e.preventDefault()
        if (message.length > 0 && message.length <= maxLength) {
            try {
                dispatch(addTweetUser(message))
                await toast.success(message)
                await window.location.reload()
            } catch (error) {
                toast.warning("Error al enviar el tweet, intentelo más tarde")
            }
            setShow(false)
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
