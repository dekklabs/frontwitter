import React from 'react'
import { Button } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { changeTheme } from '../../actions/theme/theme'

export const ChangeColor = () => {

    const dispatch = useDispatch()

    const handleOnLight = () => {
        dispatch(changeTheme('light'))
    }

    const handleOnDark = () => {
        dispatch(changeTheme('dark'))
    }

    return (
        <div className="mt-4 bloq-change-color">
            <span>Cambiar de color</span>
            <div className="d-flex">
                <Button 
                    className="changeTheme left" 
                    variant="light"
                    onClick={handleOnLight}
                >
                    Light
                </Button>
                <Button 
                    className="changeTheme right" 
                    variant="dark"
                    onClick={handleOnDark}
                >
                    Dark
                </Button>
            </div>
        </div>
    )
}
