import { useMutation, useQuery } from '@tanstack/react-query';
import { login, refreshToken } from '../../baseRequests';
import { tokenClient } from '../../../config';

export const useLoginMutation = () => useMutation({
    mutationKey: ['login'],
    mutationFn: login,
});

export const useRefetchTokenQuery = () => {
    return useQuery({
        queryKey: ['token'],
        queryFn: refreshToken,
        refetchInterval: 1000 * 60 * 5, // 5 minutes
        enabled: !!tokenClient.get(),
    });
};
