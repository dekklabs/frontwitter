import React, { useEffect, useState } from 'react'
//import { map, isEmpty } from "lodash";
import User from "./User.jsx";

export default function ListUsers({users, parans}) {
    // if (isEmpty(users)) {
    //     return <h2 className="sin-resultados">No hay resultados</h2>
    // }

    const [usuarios, setUsuarios] = useState(null)

    useEffect(() => {
        parans === 'follow' ? setUsuarios(users?.follow) : setUsuarios(users?.nuevo)
    }, [parans, users])


    return (
        <ul className="list-users">
            {
                usuarios &&
                    usuarios.map(user => (
                        <User
                            key={user?.id}
                            user={user}
                        />
                    ))
            }
        </ul>
    )
}
