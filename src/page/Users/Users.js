import React, {useState, useEffect} from 'react'
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";

import { getUserFollowApi } from "../../api/follow";
import ListUsers from "../../components/ListUsers";


function Users({setRefreshCheckLogin, location, history}) {
    const [users, setUsers] = useState(null)
    const parans = useUserQuery(location)
    const [typeUser, setTypeUser] = useState(parans.type || "follow")
    const [btnLoading, setBtnLoading] = useState(false)

    const [onSearch] = useDebouncedCallback(value => {
        setUsers(null)
        history.push({
            search: queryString.stringify({...parans, search: value, page: 1})
        })
    }, 300)

    useEffect(() => {
        getUserFollowApi(queryString.stringify(parans))
            .then(response => {
                if( parans.page == 1 ) {
                    if( isEmpty(response) ) {
                        setUsers([])
                    } else {
                        setUsers(response)
                    }
                } else {
                    if( !response ) {
                        setBtnLoading(0)
                    } else {
                        setUsers([...users, ...response])
                        setBtnLoading(false)
                    }
                }

            })
            .catch(() => {
                setUsers([])
            })
    }, [location])

    const handleOnChangeType = type => {
        setUsers(null)
        if (type === "new") {
            setTypeUser("new")
        } else {
            setTypeUser("follow")
        }
        history.push({
            search: queryString.stringify({type: type, page: 1, search: ""})
        })
    }

    const moreData = () => {
        setBtnLoading(true)
        const newPage = parseInt(parans.page) + 1;
        
        history.push({
            search: queryString.stringify({
                ...parans,
                page: newPage,
            })
        })
    }

    return (
        <BasicLayout className="users" title="Usuarios" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className='users__title'>
                <h2>Usuarios</h2>
                <input
                    type="text"
                    placeholder="Busca un usuario..."
                    onChange={e => onSearch(e.target.value)}
                />
            </div>
            <ButtonGroup className="users__options">
                <Button
                    className={typeUser == "follow" && "active"}
                    onClick={() => handleOnChangeType("follow")}
                >Siguiendo
                </Button>
                <Button 
                    className={typeUser == "new" && "active"}
                    onClick={() => handleOnChangeType("new")}
                >Nuevos
                </Button>
            </ButtonGroup>

            { !users ? (
                <div className='users__loading'>
                    <Spinner animation="border" variant="info"/>
                    Cargando usuarios...
                </div>
            ) : (
                <>
                    <ListUsers
                        users={users}
                    />
                    <Button
                        className="load-more"
                        onClick={moreData}
                    >
                        {!btnLoading ? (
                            btnLoading !== 0 && "Cargar más usuarios"
                        ) : (
                            <Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                    </Button>
                </>
            )}

        </BasicLayout>
    )
}

const useUserQuery = (location) => {
    const { page = 1, type = "follow", search = "" } = queryString.parse(location.search)

    return {page, type, search}
}

export default withRouter(Users)