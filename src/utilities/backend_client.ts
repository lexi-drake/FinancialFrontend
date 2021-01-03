import axios from 'axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { StoreAction } from '../store/actions';

type SuccessAction = (input: any) => StoreAction;
type FailureAction = (input: any) => StoreAction;

const defaultOptions: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
    baseURL: 'https://financial-backend-alexa.herokuapp.com/api/'
}

const client = axios.create(defaultOptions);
const parseErrorMessage = (error: AxiosError): string => {
    return `${error.message}`;
}

interface AuthResponse {
    error: boolean;
    content: any;
}

const refreshToken = async (): Promise<AuthResponse> => {
    // We only want to try to refresh our token once.
    return await makeAuthGetRequest('user/refresh', false)
}

const makeAuthPostRequest = async (request: any, path: string, refreshIfFailed: boolean = true, options: AxiosRequestConfig = defaultOptions): Promise<AuthResponse> => {
    if (options.withCredentials) {
        console.log('sending with credentials');
    }
    const response: AuthResponse = await client.post(path, request)
        .then(response => response.data)
        .then(async (data) => {
            return { error: false, content: data };
        }).catch(async (error: AxiosError) => {
            // If the bad response-code is because we're not authorized, we want to try (only once)
            // to refresh our token.
            if (error.response?.status === 401 && refreshIfFailed) {
                const refreshResponse = await refreshToken();

                // If we got a positive response-code, we'll retry the original request, this time
                // specifying that we don't want to retry if it fails.
                if (!refreshResponse.error) {
                    return await makeAuthPostRequest(path, request, false);
                }
                // Our attempt to refresh our token failed, so we're just going to return an error.
                return refreshResponse;
            } else {
                // Either the request failed because of reasons that aren't related to authentication
                // or we aren't supposed to retry on failure.
                return { error: true, content: parseErrorMessage(error) };
            }
        });
    return response;
}

const makeAuthGetRequest = async (path: string, refreshIfFailed: boolean = true, options: AxiosRequestConfig = defaultOptions): Promise<AuthResponse> => {
    if (options.withCredentials) {
        console.log('sending with credentials');
    }
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
                return { error: true, content: parseErrorMessage(error) };
            }
        });
    return response;
}

export const post = async (request: any, path: string, successAction: SuccessAction, failureAction: FailureAction): Promise<StoreAction> => {
    const response: AuthResponse = await makeAuthPostRequest(request, path);
    if (response.error) {
        return failureAction(response.content);
    } else {
        return successAction(response.content);
    }
}

export const get = async (path: string, successAction: SuccessAction, failureAction: FailureAction): Promise<StoreAction> => {
    const response: AuthResponse = await makeAuthGetRequest(path);
    if (response.error) {
        return failureAction(response.content);
    } else {
        return successAction(response.content);
    }
}