import React, {useEffect, useState} from 'react'
import { Image } from "react-bootstrap";
// import { map } from "lodash"
import AvatarNoFound from "../../assets/png/avatar-no-found.png"
import { API_HOST } from "../../utils/constant";
import moment from 'moment'
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import { useDispatch, useSelector } from 'react-redux';
// import { getLoaduser } from "../../actions/user.jsx";
import { getUserById } from '../../actions/user/getUserById';
import { Link } from 'react-router-dom';

export default function ListTweetsHome() {
    const {tweets} = useSelector(state => state.tweet)

    return (
        <div className="list-tweets">
            {tweets && 
                tweets.map((tweet, index) => (
                    <Tweet
                        key={index}
                        tweet={tweet}
                    />
                ))
            }
        </div>
    )
}

const Tweet = ({tweet}) => {
    const {theme} = useSelector(state => state.theme);
    var tema = theme === 'dark' ? 'base-text-color-light' : 'base-text-color-dark'
    const dispatch = useDispatch()

    const [usuario, setUsuario] = useState(null)

    const { Tweet : {mensaje} } = tweet
    
    const avatar = usuario?.id ? `${API_HOST}/obtener-avatar?id=${usuario?.id}` : AvatarNoFound
    
    useEffect(() => {
        const user = dispatch(getUserById(tweet.userRelationId))
        user.then(res => {
            setUsuario(res)
        })
    }, [tweet, dispatch])

    return (
        <div className='tweet'>
            <Link to={`/${usuario?.id}`}>
                <Image className="avatar" src={avatar} roundedCircle />
            </Link>
            <div>
                <div className='name'>
                    <Link to={`/${usuario?.id}`}>
                        {usuario?.nombre} {usuario?.apellidos}
                    </Link>
                    <span className={tema}>{ moment(tweet.fecha).calendar()}</span>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(mensaje)}}
                    className={tema}
                />
            </div>
        </div>
    )
}