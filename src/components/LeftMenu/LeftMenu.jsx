import React, {useState} from 'react'
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome, 
    faUsers,
    faUser,
    faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"

import LogoTwitterWhite from '../../assets/png/logo-white.png'
import TweetModal from "../modal/TweetModal/TweetModal.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { decryptUser } from '../../utils/decrypt';
import { logOut } from '../../actions/logout';
import { ChangeColor } from '../ChangeColor/ChangeColor';

export default function LeftMenu({setRefreshCheckLogin}) {

    const dispatch = useDispatch()

    const {token} = useSelector(state => state.auth);
    const {theme} = useSelector(state => state.theme);
    const user = decryptUser(token)

    const [showModal, setShowModal] = useState(false)

    var tema = theme === 'dark' ? 'base-text-color-light' : 'base-text-color-dark'

    const handleLogOut = () => {
        dispatch(logOut())
    }

    return (
        <div className="left-menu">
            <img className="logo" src={LogoTwitterWhite} alt="logo twitter" />
            <Link to="/" className={tema}>
                <FontAwesomeIcon icon={faHome}/>
                Inicio
            </Link>
            <Link to="/users" className={tema}>
                <FontAwesomeIcon icon={faUsers}/>
                Usuarios
            </Link>
            <Link to={`/${user?._id}`} className={tema}>
                <FontAwesomeIcon icon={faUser}/>
                Perfil
            </Link>
            <Link to="" onClick={handleLogOut} className={tema}>
                <FontAwesomeIcon icon={faPowerOff}/>
                Cerrar sessión
            </Link>
            <Button
                onClick={() => setShowModal(true)}
            >Twittear</Button>
            <TweetModal
                show={showModal}
                setShow={setShowModal}
            />
            <ChangeColor />
        </div>
    )
}
