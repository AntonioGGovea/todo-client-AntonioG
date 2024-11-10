import { useEffect } from 'react';
import { useRefetchTokenQuery } from '../../services/controllerBaseQueries/auth';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { tokenClient } from '../../config';

const AuthProvider = () => {
    const nav = useNavigate();
    const isLogin = useMatch('/login');
    const isHome = useMatch('/');
    const token = tokenClient.get();

    const query = useRefetchTokenQuery();

    console.log("query.error", query.error)

    useEffect(() => {
        if ((query.error || !token) && !isLogin) {
            tokenClient.remove();
            nav('/login');
        }
        if (isHome) nav('/todo');
    }, [query.error, token, isLogin, nav, isHome])

    return token ? <Outlet /> : <p>Redirecting...</p>;
};

export default AuthProvider;
