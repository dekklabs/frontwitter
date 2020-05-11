import React,{useState, useEffect} from 'react'
import { Button } from "react-bootstrap"

/* Modal Component */
import ConfigModal from "../../modal/ConfigModal"
import EditUserForm from "../../User/EditUserForm";

import AvatarNoFound from "../../../assets/png/avatar-no-found.png"
import { API_HOST } from "../../../utils/constant"
import { checkFollowApi, followUserApi, unFollowUserApi } from "../../../api/follow";

export default function BannerAvatar({user, logedUser}) {

    const bannerUrl = user?.banner ? `${API_HOST}/obtener-banner?id=${user.id}` : null
    const avatarUrl = user?.avatar ? `${API_HOST}/obtener-avatar?id=${user.id}` : AvatarNoFound
    const [realoadFollow, setRealoadFollow] = useState(false)
    const [followin, setFollowin] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if( user ) {
            checkFollowApi(user?.id).then(response => {
                if (response?.status) {
                    setFollowin(true)
                } else {
                    setFollowin(false)
                }
            })
        }
        setRealoadFollow(false)
    }, [user, realoadFollow])

    const handleOnFollow = () => {
        followUserApi(user?.id).then(() => {
            setRealoadFollow(true)
        })
    }

    const handleUnFollow = () => {
        unFollowUserApi(user?.id).then(() => {
            setRealoadFollow(true)
        })
    }

    return (
        <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div
                className='avatar'
                style={{ backgroundImage: `url('${avatarUrl}')` }}
                >
            </div>
            { user && (
                <div className='options'>
                    {logedUser._id === user.id && (
                        <Button
                            onClick={() => setShowModal(true)}
                        >Editar perfil</Button>
                    )}
                    { logedUser._id !== user.id && (
                        followin !== null && (
                            followin ?  (
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
                    user={user}
                    setShowModal={setShowModal}
                />
            </ConfigModal>
        </div>
    )
}
