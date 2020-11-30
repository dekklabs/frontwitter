import React from 'react'
import { Media, Image } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
//import { getUserApi } from "../../api/user";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constant";

export default function User({user}) {
    const {theme} = useSelector(state => state.theme);
    var tema = theme === 'dark' ? 'base-text-color-light' : 'base-text-color-dark'
    return (
        <Media as={Link} to={`/${user.id}`} className="list-users__user">
            <Image
                width={64}
                headers = {64}
                roundedCircle
                className="mr-3"
                src={
                    user?.avatar 
                        ? `${API_HOST}/obtener-avatar?id=${user.id}`
                        : AvatarNoFound
                }
                alt={user?.nombre}
            />
            <Media.Body className="align-self-center">
                <h5 className={`mb-0 ${tema}`}>{user?.nombre} {user?.apellidos}</h5>
                <p className={`mb-0 ${tema}`}>{user?.biografia}</p>
            </Media.Body>
        </Media>
    )
}
