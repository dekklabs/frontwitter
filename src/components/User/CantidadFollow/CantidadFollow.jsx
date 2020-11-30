import React from 'react'
import { useSelector } from 'react-redux';

export const CantidadFollow = () => {
    const {follow} = useSelector(state => state.users);

    const {theme} = useSelector(state => state.theme);
    var tema = theme === 'dark' ? 'base-text-color-light' : 'base-text-color-dark'
    return (
        <div className="info-user d-flex">
            <p className={`mr-3 ${tema}`}>Seguidores: {follow.length}</p>
            <p className={`${tema}`}>Siguiendo: 5</p>
        </div>
    )
}
