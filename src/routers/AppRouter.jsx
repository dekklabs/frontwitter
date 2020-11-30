import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { PublicRoute } from './PublicRoute.jsx'
import { PrivateRoute } from './PrivateRoute.jsx'
import SignInSingUp from '../page/SigninSingup/SignInSignUp.jsx'
import { Dashboard } from './Dashboard.jsx'
import { useSelector } from 'react-redux'

export const AppRouter = () => {

    const {logged} = useSelector(state => state.auth)
    const {theme} = useSelector(state => state.theme)

    let tema = theme === 'dark' ? "base-dark" : "base-light"

    return (
        <Router>
            <div className={ tema }>
                <Switch>
                    <PublicRoute
                        exact
                        path="/auth"
                        component={SignInSingUp}
                        isLoggedIn={logged}
                    />
                    <PrivateRoute
                        path="/"
                        component={Dashboard}
                        isLoggedIn={logged}
                    />
                </Switch>
            </div>
        </Router>
    )
}