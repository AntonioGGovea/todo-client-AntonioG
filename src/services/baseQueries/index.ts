
import { DefaultError, UndefinedInitialDataOptions, useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { tokenStorageKey } from '../baseRequests';

export const useQueryWithAuth = <
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData
>(options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, unknown[]>)
    : UseQueryResult<TData, TError> => {
    const token = sessionStorage.getItem(tokenStorageKey);
    return useQuery({
        ...options,
        queryKey: [...options.queryKey, token],
        enabled: !!token && (
            options.enabled === undefined || options.enabled
        ),
    });
};

export const useMutationWithAuth = <
    TData = unknown,
    TError = DefaultError,
    TVariables = void,
    TContext = unknown
>(options: UseMutationOptions<TData, TError, TVariables, TContext>)
    : UseMutationResult<TData, TError, TVariables, TContext> => {
    const token = sessionStorage.getItem(tokenStorageKey);
    return useMutation({
        ...options,
        mutationKey: [options.mutationKey, token],
        retry: true,
        retryDelay: 1000,
    });
};