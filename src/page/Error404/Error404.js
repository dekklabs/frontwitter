import React from 'react'
import { Link } from "react-router-dom";
import Error404Img from '../../assets/png/error404.png'
import Logo from '../../assets/png/logo.png'

export default function Error404() {
    return (
        <div className="error404">
            <img src={Logo} alt="logo"/>
            <img src={Error404Img} alt="error 404"/>
            <Link to="/">
                Volver al inicio
            </Link>
        </div>
    )
}
