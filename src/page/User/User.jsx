import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
/* Componentes */
import BannerAvatar from "../../components/User/BannerAvatar/BannerAvatar.jsx";
import InfoUser from "../../components/User/InfoUser/InfoUser.jsx";
import { useParams, withRouter } from "react-router-dom";
import { getTweetUser } from '../../actions/tweet/getTweetUser';
import ListTweets from "../../components/ListTweets/ListTweets.jsx";

function User({match, setRefreshCheckLogin}) {
    
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const {profile, user} = useSelector(state => state.user)
    const {id : idUser} = useParams();
    const {theme} = useSelector(state => state.theme);
    var tema = theme === 'dark' ? 'base-text-color-light' : 'base-text-color-dark'

    const {tweet : tweets} = useSelector(state => state.tweet)

    useEffect(() => {
        dispatch(getTweetUser(page, idUser))
    }, [page, dispatch, idUser])


    // const [loadingTweet, setLoadingTweet] = useState(false)

    // const moreData = () => {
    //     const pageTemp = page + 1
    //     setLoadingTweet(true)
    //     getUserTweetApi(params.id, pageTemp).then(res => {
    //         if( !res ) {
    //             setLoadingTweet(0)
    //         } else {
    //             setTweets([...tweets, ...res])
    //             setPage(pageTemp)
    //             setLoadingTweet(false)
    //         }
    //     })
    // }

    return (
        <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="user__title">
                <h2 className={tema}>
                    {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}
                </h2>
            </div>
            <BannerAvatar
                user={user}
                profile={profile}
            />
            <InfoUser
                user={user}
            />
            
            <div className="user__tweets">
				{tweets &&
                	<h3 className={tema}>Tweets ({tweets?.length === 0 ? '0' : tweets?.length})</h3>
				}
                {tweets && <ListTweets tweets={tweets} idUser={idUser} />}
                {/* <Button
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
                </Button> */}
            </div>
        </BasicLayout>
    )
}

export default withRouter(User)
