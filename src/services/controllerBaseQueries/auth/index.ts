import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequestWithAuth, login, refreshToken } from '../../baseRequests';
import { tokenClient } from '../../../config';
import { useMutationWithAuth } from '../../baseQueries';
import { AuthEndpoints, Controllers } from '../../../constants';
import { UserModel } from '../../../interfaces';

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

export const useLogoutMutation = () => useMutationWithAuth({
    mutationKey: ['Logout'],
    mutationFn: () => apiRequestWithAuth({
        controller: Controllers.Auth,
        endpoint: AuthEndpoints.Logout,
        method: 'GET',
    }),
    retry: false,
});

export const useRegisterMutation = () => useMutationWithAuth({
    mutationKey: ['Register'],
    mutationFn: (user: UserModel) => login(user, 'register'),
    onSuccess: (_, user) => login(user),
});
