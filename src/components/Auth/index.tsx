import { useQuery } from '@tanstack/react-query';
import { authorize } from '../../services';
import { PropsWithChildren } from 'react';

const AuthProvider = ({ children }: PropsWithChildren) => {
    useQuery({
        queryKey: ["token"],
        queryFn: authorize,
        refetchInterval: 1000 * 60 * 5, // 5 minutes
    });

    return children;
};

export default AuthProvider;
