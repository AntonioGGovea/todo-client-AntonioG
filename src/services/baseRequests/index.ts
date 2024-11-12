import { tokenClient } from '../../config';
import { AuthEndpoints, Controllers } from '../../constants';
import { UserModel } from '../../interfaces';

type MethodTypes = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestProps<TBody = undefined> {
    controller: Controllers,
    endpoint?: string,
    method?: MethodTypes,
    body?: TBody,
}

export const apiRequest = <TBody = undefined>(
    props: RequestProps<TBody>
) => {
    const endpoint = props.endpoint ? `/${props.endpoint}` : '';
    const bodyIfExists = props.body && { body: JSON.stringify(props.body) };

    return fetch(
        `${import.meta.env.BASE_URL}${props.controller}${endpoint}`, {
        method: props.method ?? 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenClient.get()}`,
        },
        ...bodyIfExists,
    });
}

export const login = (user: UserModel, type: 'login' | 'register' = 'login') => apiRequest({
    controller: Controllers.Auth,
    endpoint: type === 'login' ? AuthEndpoints.Login : undefined,
    method: 'POST',
    body: user
})
    .then((authRes) => {
        if (authRes.ok) return authRes.text();
        return Promise.reject(new Error(`Failed to ${type}`))
    })
    .then((token) => {
        if (token) tokenClient.set(token)
        return token;
    });

export const refreshToken = () => apiRequest({
    controller: Controllers.Auth,
    endpoint: AuthEndpoints.GenerateToken,
})
    .then((authRes) => {
        if (authRes.ok) return authRes.text();
        return Promise.reject(new Error('Couldn\'t retrieve token'))
    })
    .then((token) => {
        if (token) tokenClient.set(token)
        return token;
    });

export const apiRequestWithAuth = async <TResult = unknown, TBody = unknown>(
    props: RequestProps<TBody>
): Promise<TResult> => {
    const response = await apiRequest<TBody>(props)
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(new Error('Add message here'));
            }
            const result = res?.json().catch(() => { }) as TResult;
            return result
        });
    return response
};
