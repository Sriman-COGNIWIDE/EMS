// PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Navigate to="/login" />
            )
        } />
    );
};

export default PrivateRoute;
