import React, {useState, useEffect} from 'react'
import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
/* Componentes */
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import { withRouter } from "react-router-dom";
import { getUserApi } from "../../api/user";
import ListTweets from "../../components/ListTweets";
import { toast } from 'react-toastify';
import useAuth from "../../hooks/useAuth";
import { getUserTweetApi } from "../../api/tweet";

function User({match, setRefreshCheckLogin}) {
    
    const [user, setUser] = useState(null)
    const { params } = match
    /* información del usuario que esta logeado */
    const logedUser = useAuth()
    const [tweets, setTweets] = useState(null)
    const [page, setPage] = useState(1)
    const [loadingTweet, setLoadingTweet] = useState(false)

    useEffect(() => {
        getUserApi(params.id).then(res => {
            if (!res) toast.error("El usuario que has visitado no existe")
            setUser(res)
        }).catch(() => {
            toast.error("El usuario que has visitado no existe")
        })
    }, [params])

    useEffect(() => {
        getUserTweetApi(params.id, 1)
            .then(response => {
                setTweets(response)
            })
            .catch(() => {
                setTweets([])
            })
    }, [params])

    const moreData = () => {
        const pageTemp = page + 1
        setLoadingTweet(true)
        getUserTweetApi(params.id, pageTemp).then(res => {
            if( !res ) {
                setLoadingTweet(0)
            } else {
                setTweets([...tweets, ...res])
                setPage(pageTemp)
                setLoadingTweet(false)
            }
        })
    }

    return (
        <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="user__title">
                <h2>
                    {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}
                </h2>
            </div>
            <BannerAvatar
                user={user}
                logedUser={logedUser}
            />
            <InfoUser
                user={user}
            />
            
            <div className="user__tweets">
                <h3>Tweets</h3>
                {tweets && <ListTweets tweets={tweets}/>}
                <Button
                    onClick={moreData}
                >
                    {!loadingTweet ? (
                        loadingTweet !== 0 && "Obtener más tweets"
                    ) : (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            arian-hidden="true"
                        />
                    )
                }
                </Button>
            </div>
        </BasicLayout>
    )
}

export default withRouter(User)