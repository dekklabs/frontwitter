import React, {useState, useEffect} from 'react'
import { Media, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserApi } from "../../api/user";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constant";

export default function User({user}) {
    
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        getUserApi(user.id).then(res => {
            setUserInfo(res)
        })
    }, [user])

    return (
        <Media as={Link} to={`/${user.id}`} className="list-users__user">
            <Image
                width={64}
                headers = {64}
                roundedCircle
                className="mr-3"
                src={
                    userInfo?.avatar 
                        ? `${API_HOST}/obtener-avatar?id=${userInfo.id}`
                        : AvatarNoFound
                }
                alt={userInfo?.nombre}
            />
            <Media.Body className="align-self-center">
                <h5 className="mb-0">{userInfo?.nombre} {userInfo?.apellidos}</h5>
                <p className="mb-0">{userInfo?.biografia}</p>
            </Media.Body>
        </Media>
    )
}
