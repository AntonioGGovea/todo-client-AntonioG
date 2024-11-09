import { AuthEndpoints, Controllers } from '../../constants';
import { UserModel } from '../../interfaces';

// TODO: get from env
const baseUrl = "https://localhost:44350/api/";
export const tokenStorageKey = "tokenStorageKey";

type MethodTypes = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestProps<TBody = undefined> {
    controller: Controllers,
    endpoint?: string,
    method?: MethodTypes,
    body?: TBody,
}

export const apiRequest = <TBody = undefined>(
    props: RequestProps<TBody>
) => {
    const endpoint = props.endpoint ? `/${props.endpoint}` : "";
    const bodyIfExists = props.body && { body: JSON.stringify(props.body) };
    const token = sessionStorage.getItem(tokenStorageKey);

    return fetch(
        `${baseUrl}${props.controller}${endpoint}`, {
        method: props.method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        ...bodyIfExists,
    });
}

export const login = (user: UserModel) => apiRequest({
    controller: Controllers.Auth,
    endpoint: AuthEndpoints.Login,
    method: "POST",
    body: user
})
    .then((authRes) => authRes.text())
    .then((token) => {
        if (token) sessionStorage.setItem(tokenStorageKey, token)
        return token;
    });

export const refreshToken = () => apiRequest({
    controller: Controllers.Auth,
    endpoint: AuthEndpoints.GenerateToken,
})
    .then((authRes) => authRes.text())
    .then((token) => {
        if (token) sessionStorage.setItem(tokenStorageKey, token)
        return token;
    });

export const apiRequestWithAuth = async <TResult = unknown, TBody = unknown>(
    props: RequestProps<TBody>
): Promise<TResult> => {
    const response = await apiRequest<TBody>(props)
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(new Error("Add message here"));
            }
            const result = res?.json().catch(() => { }) as TResult;
            return result
        });
    return response
};
