import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className='min-h-3/5 flex gap-4 justify-center items-center'>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>  // if it is not a logged in user we are navigating them into login page , using private route but we are also trying to get the location or state that which route user actually want to go by : state={location.pathname}
    }
    return children;
};

export default PrivateRoute;