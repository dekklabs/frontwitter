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
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import TweetModal from "../modal/TweetModal";

export default function LeftMenu({setRefreshCheckLogin}) {

    const user = useAuth()

    const [showModal, setShowModal] = useState(false)

    const handleLogOut = () => {
        logoutApi()
        setRefreshCheckLogin(true)
    }

    return (
        <div className="left-menu">
            <img className="logo" src={LogoTwitterWhite} alt="logo twitter" />
            <Link to="/">
                <FontAwesomeIcon icon={faHome}/>
                Inicio
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers}/>
                Usuarios
            </Link>
            <Link to={`/${user?._id}`}>
                <FontAwesomeIcon icon={faUser}/>
                Perfil
            </Link>
            <Link to="" onClick={handleLogOut}>
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
        </div>
    )
}
