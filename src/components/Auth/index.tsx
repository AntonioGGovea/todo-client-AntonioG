import { PropsWithChildren } from 'react';
import { useRefetchTokenQuery } from '../../services/controllerBaseQueries/auth';

const AuthProvider = ({ children }: PropsWithChildren) => {
    useRefetchTokenQuery();

    return children;
};

export default AuthProvider;
