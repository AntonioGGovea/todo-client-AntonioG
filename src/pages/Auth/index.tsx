import { useEffect } from 'react';
import { useRefetchTokenQuery } from '../../services/controllerBaseQueries/auth';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { tokenClient } from '../../config';
import PageHeader from '../../components/PageHeader';
import pages from '../../constants';

const AuthProvider = () => {
    const nav = useNavigate();
    const isLogin = useMatch('/login');
    const isHome = useMatch('/');
    const token = tokenClient.get();

    const query = useRefetchTokenQuery();

    console.log('query.error', query.error)

    useEffect(() => {
        if ((query.error || !token) && !isLogin) {
            tokenClient.remove();
            nav('/login');
        }
        if (isHome) nav(pages.todo.path);
    }, [query.error, token, isLogin, nav, isHome])

    if (!token) return <p>Redirecting...</p>;

    return (
        <>
            <PageHeader />
            <Outlet />
        </>
    );
};

export default AuthProvider;
