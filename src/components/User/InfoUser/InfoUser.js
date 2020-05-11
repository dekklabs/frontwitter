import React from 'react'
import { Location, Link, DateBirth } from "../../../utils/icons";
import moment from 'moment'
import localization from "moment/locale/es";

export default function InfoUser({user}) {
    return (
        <div className="info-user">
            <h2 className="name">
                {user?.nombre} {user?.apellidos}
            </h2>
            <p className="email">
                {user?.email}
            </p>
            {user?.biografia && (
                <div className='description'>
                    <p>
                        {user.biografia}
                    </p>
                </div>
            )}
            <div className='more-info'>
                {user?.ubicacion && (
                    <p>
                        <Location />
                        {user.ubicacion}
                    </p>
                )}
                {user?.sitioWeb && (
                    <a href={user.sitioWeb} target="_blank" rel="noopener noreferrer" alt={user.sitioWeb}><Link /> {user.sitioWeb}</a>
                )}
                {user?.fechaNacimiento && (
                    <p>
                        <DateBirth />
                        {moment(user.fechaNacimiento).local("es", localization).format("LL")}
                    </p>
                )}
            </div>
        </div>
    )
}
