import axios from 'axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { StoreAction } from '../store/actions';

type SuccessAction = (input: any) => StoreAction;
type FailureAction = (input: any) => StoreAction;

const defaultOptions: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
    baseURL: 'https://api.letskeepit.cheap/api/'
}

const client = axios.create(defaultOptions);

interface AuthResponse {
    error: boolean;
    content: any;
}

const refreshToken = async (): Promise<AuthResponse> => {
    // Only try to refresh the token once.
    return await makeAuthGetRequest('user/refresh', false)
}

const makeAuthPostRequest = async (request: any, path: string, refreshIfFailed: boolean = true): Promise<AuthResponse> => {
    const response: AuthResponse = await client.post(path, request)
        .then(response => response.data)
        .then(async (data) => {
            return { error: false, content: data };
        }).catch(async (error: AxiosError) => {
            // If the bad response-code is because the request is not authorized,
            // so an attempt is made to refresh the token. 
            if (error.response?.status === 401 && refreshIfFailed) {
                const refreshResponse = await refreshToken();
                // If the refresh request was successful, retry the original request.
                if (!refreshResponse.error) {
                    return await makeAuthPostRequest(path, request, false);
                }
                // The attempt to refresh the token failed. Return the error.
                return refreshResponse;
            } else {
                // Either the request failed because of reasons that aren't related to authentication
                // or this was the second attempt to make the request.
                return { error: true, content: error };
            }
        });
    return response;
}

const makeAuthGetRequest = async (path: string, refreshIfFailed: boolean = true): Promise<AuthResponse> => {
    // See documentation for 'makeAuthPostRequest' for an approximation of how this method should be
    // commented; the logic is all pretty much the same.
    const response: AuthResponse = await client.get(path)
        .then(response => response.data)
        .then(async (data) => {
            return { error: false, content: data };
        }).catch(async (error: AxiosError) => {
            if (error.response?.status === 401 && refreshIfFailed) {
                const refreshResponse = await refreshToken();
                if (!refreshResponse.error) {
                    return await makeAuthGetRequest(path, false);
                }
                return refreshResponse;
            } else {
                return { error: true, content: error };
            }
        });
    return response;
}

const makeAuthDeleteRequest = async (path: string, refreshIfFailed: boolean = true): Promise<AuthResponse> => {
    // See documentation for 'makeAuthDeleteRequest' for an approximation of how this method should be
    // commented; the logic is all pretty much the same.
    const response: AuthResponse = await client.delete(path)
        .then(response => response.data)
        .then(async (data) => {
            return { error: false, content: data };
        }).catch(async (error: AxiosError) => {
            if (error.response?.status === 401 && refreshIfFailed) {
                const refreshResponse = await refreshToken();
                if (!refreshResponse.error) {
                    return await makeAuthGetRequest(path, false);
                }
                return refreshResponse;
            } else {
                return { error: true, content: error };
            }
        });
    return response;
}

const makeAuthPutRequest = async (request: any, path: string, refreshIfFailed: boolean = true): Promise<AuthResponse> => {
    const response: AuthResponse = await client.put(path, request)
        .then(response => response.data)
        .then(async (data) => {
            return { error: false, content: data };
        }).catch(async (error: AxiosError) => {
            // If the bad response-code is because the request is not authorized,
            // so an attempt is made to refresh the token. 
            if (error.response?.status === 401 && refreshIfFailed) {
                const refreshResponse = await refreshToken();
                // If the refresh request was successful, retry the original request.
                if (!refreshResponse.error) {
                    return await makeAuthPutRequest(path, request, false);
                }
                // The attempt to refresh the token failed. Return the error.
                return refreshResponse;
            } else {
                // Either the request failed because of reasons that aren't related to authentication
                // or this was the second attempt to make the request.
                return { error: true, content: error };
            }
        });
    return response;
}

const makeAuthPatchRequest = async (request: any, path: string, refreshIfFailed: boolean = true): Promise<AuthResponse> => {
    const response: AuthResponse = await client.patch(path, request)
        .then(response => response.data)
        .then(async (data) => {
            return { error: false, content: data };
        }).catch(async (error: AxiosError) => {
            if (error.response?.status === 401 && refreshIfFailed) {
                const refreshResponse = await refreshToken();
                if (!refreshResponse.error) {
                    return await makeAuthPatchRequest(path, request, false);
                }
                return refreshResponse;
            } else {
                return { error: true, content: error };
            }
        });
    return response;
}

export const post = async (request: any, path: string, successAction: SuccessAction, failureAction: FailureAction): Promise<StoreAction> => {
    const response: AuthResponse = await makeAuthPostRequest(request, path);
    if (response.error) {
        return failureAction(response.content);
    }
    return successAction(response.content);
}

export const get = async (path: string, successAction: SuccessAction, failureAction: FailureAction): Promise<StoreAction> => {
    const response: AuthResponse = await makeAuthGetRequest(path);
    if (response.error) {
        return failureAction(response.content);
    }
    return successAction(response.content);
}

export const del = async (path: string) =>
    await makeAuthDeleteRequest(path);

export const put = async (request: any, path: string, successAction: SuccessAction, failureAction: FailureAction): Promise<StoreAction> => {
    const response: AuthResponse = await makeAuthPutRequest(request, path);
    if (response.error) {
        return failureAction(response.content);
    }
    return successAction(response.content);
}

export const patch = async (request: any, path: string, successAction: SuccessAction, failureAction: FailureAction): Promise<StoreAction> => {
    const response: AuthResponse = await makeAuthPatchRequest(request, path);
    if (response.error) {
        return failureAction(response.content);
    }
    return successAction(response.content);
}