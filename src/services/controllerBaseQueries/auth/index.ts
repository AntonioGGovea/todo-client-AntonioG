import { useMutation, useQuery } from '@tanstack/react-query';
import { login, refreshToken, tokenStorageKey } from '../../baseRequests';

export const useLoginMutation = () => useMutation({
    mutationKey: ["login"],
    mutationFn: login,
});

export const useRefetchTokenQuery = () => useQuery({
    queryKey: ["token"],
    queryFn: refreshToken,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    enabled: !!sessionStorage.getItem(tokenStorageKey),
});
