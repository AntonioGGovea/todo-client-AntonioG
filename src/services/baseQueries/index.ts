
import { DefaultError, UndefinedInitialDataOptions, useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { tokenClient } from '../../config';

export const useQueryWithAuth = <
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData
>(options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, unknown[]>)
    : UseQueryResult<TData, TError> => {
    const token = tokenClient.get();
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
    const token = tokenClient.get();
    return useMutation({
        ...options,
        mutationKey: [options.mutationKey, token],
    });
};
