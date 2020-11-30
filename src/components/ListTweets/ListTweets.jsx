import React, {useEffect} from 'react'
import { Image } from "react-bootstrap";
import { map } from "lodash"
import AvatarNoFound from "../../assets/png/avatar-no-found.png"
import { API_HOST } from "../../utils/constant";
import moment from 'moment'
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import { useDispatch, useSelector } from 'react-redux';
import { getLoaduser } from "../../actions/user.jsx";

export default function ListTweets({tweets, idUser}) {
    return (
        <div className="list-tweets">
            {map(tweets, (tweet, index) => (
                <Tweet
                    key={index}
                    tweet={tweet}
                    idUser={idUser}
                />
            ))}
        </div>
    )
}

const Tweet = ({tweet, idUser}) => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const {theme} = useSelector(state => state.theme);
    var tema = theme === 'dark' ? 'base-text-color-light' : 'base-text-color-dark'

    const avatar = user?.avatar ? `${API_HOST}/obtener-avatar?id=${user.id}` : AvatarNoFound

    useEffect(() => {
        dispatch(getLoaduser(idUser))
    }, [tweet, dispatch, idUser])

    return (
        <div className='tweet'>
            <Image className="avatar" src={avatar} roundedCircle />
            <div>
                <div className={`name ${tema}`}>
                    {user?.nombre} {user?.apellidos}
                    <span className={tema}>{ moment(tweet.fecha).calendar()}</span>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(tweet.mensaje)}}
                    className={tema}
                />
            </div>
        </div>
    )
}