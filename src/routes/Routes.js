import React from 'react'

import { Switch, Route } from 'react-router-dom';

import {
    PageRoutes,
} from "./RoutesConfig";


import PageNotFound from '../pages/PageNotFound'
import Login from '../pages/Login';
import Home from '../pages/Home';

function Routes() {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route
                    path="/login"
                    exact
                    component={Login}
                />

                {/* Routes Loop*/}

                {PageRoutes.map(({ path, name, Component }, key) => (
                    <Route exact path={path} key={key} >
                        <Component />
                    </Route>
                ))}

                <Route path="*" exact component={PageNotFound} />

            </Switch>

        </>
    )
}

export default Routes
