import React,{useState, useEffect} from 'react'
import { Button } from "react-bootstrap"

/* Modal Component */
import ConfigModal from "../../modal/ConfigModal"
import EditUserForm from "../EditUserForm/EditUserForm.jsx";

import AvatarNoFound from "../../../assets/png/avatar-no-found.png"
import { API_HOST } from "../../../utils/constant"
//import { checkFollowApi, followUserApi, unFollowUserApi } from "../../../api/follow";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoaduser } from '../../../actions/user';
import { check } from '../../../actions/follow/check';
import { followUser } from '../../../actions/follow/follow';
import { unFollowUser } from '../../../actions/follow/unfollow';

export default function BannerAvatar({user, profile}) {

    const dispatch = useDispatch()
    
    const {id} = useParams();

    const {status, follow} = useSelector(state => state.follow)

    useEffect(() => {
        if (user?.id !== profile?.id) {
            dispatch(check(id))
        }
    }, [id, dispatch, user, profile])



    const bannerUrl = user?.banner ? `${API_HOST}/obtener-banner?id=${user.id}` : null
    const avatarUrl = user?.avatar ? `${API_HOST}/obtener-avatar?id=${user.id}` : AvatarNoFound
    // const [realoadFollow, setRealoadFollow] = useState(false)
    // const [followin, setFollowin] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const {id:_id} = useParams()

    useEffect(() => {
        dispatch(getLoaduser(_id))
    }, [_id, dispatch])

    const handleOnFollow = () => {
        dispatch(followUser(user?.id))
        //setRealoadFollow(true)
    }

    const handleUnFollow = () => {
        dispatch(unFollowUser(user?.id))
    }

    return (
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div
                className='avatar'
                style={{ backgroundImage: `url('${avatarUrl}')` }}
                >
            </div>
            { profile && (
                <div className='options'>
                    {profile.id === user.id && (
                        <Button
                            onClick={() => setShowModal(true)}
                        >Editar perfil</Button>
                    )}
                    { profile.id !== user.id && (
                        status !== null && (
                            follow ?  (
                                <Button
                                    onClick={handleUnFollow}
                                    className="unfollow">
                                    <span>Siguiendo</span>
                                </Button>
                            ) : (
                                <Button onClick={handleOnFollow}>Seguir</Button>
                            )
                        )
                    )}
                </div>
            )}
            <ConfigModal
                show={showModal}
                setShow={setShowModal}
                title="Editar perfíl"
            >
                <EditUserForm
                    perfil={profile}
                    setShowModal={setShowModal}
                />
            </ConfigModal>
        </div>
    )
}
