import { AuthEndpoints, Controllers } from '../../constants';

// TODO: get it from env
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

export const authorize = () => apiRequest({
    controller: Controllers.Auth,
    endpoint: AuthEndpoints.Login,
    method: "POST",
    body: {
        email: "test@test.com",
        password: "test",
    }
})
    .then((authRes) => {
        return authRes.text()
    })
    .then((token) => {
        if (token) sessionStorage.setItem(tokenStorageKey, token)
        return token;
    });

export const apiRequestWithAuth = async <TResult = unknown, TBody = unknown>(
    props: RequestProps<TBody>
): Promise<TResult> => {
    const response = await apiRequest<TBody>(props)
        .then((res) => {
            if (res.ok) {
                const result = res?.json() as TResult;
                return result
            }
            return Promise.reject(new Error("Add message here"));
        });
    return response
};
