import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import Home from "../page/Home/Home.jsx";
import User from '../page/User/User.jsx';
import Users from '../page/Users/Users.jsx';
//import { Res } from '../page/Home/Res.jsx';

export const Dashboard = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/:id" component={User} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}