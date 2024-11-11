import { useCallback } from 'react';
import { tokenClient } from '../config';
import { useNavigate } from 'react-router-dom';
import { pages } from '../constants';
import { useLogoutMutation } from '../services';

export const useLogout = () => {
    const nav = useNavigate();

    const logoutMutation = useLogoutMutation();

    const logout = useCallback(() => {
        logoutMutation.mutateAsync().finally(() => {
            tokenClient.remove();
            nav(pages.login.path);
        });
    }, [logoutMutation, nav]);

    return logout;
}
