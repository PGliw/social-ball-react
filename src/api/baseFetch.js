import {SERVER_URL} from "../config";

export const API_METHODS = {
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    GET: 'GET',
};

const ERROR_STATUS_CODES = [400, 401, 404, 500];
const ERROR_MESSAGE_LOOKUP = {
    400: "Błędne zapytanie (400)",
    401: "Nieupoważniony dostęp",
    404: "Podana strona nie istnieje",
    500: "Błąd serwera",
};

export const fetchFromApi = (method, pathSuffix, handleLoading, handleError, handleSuccess, body = null, headers = {}, defaultErrorMessage = 'Nieznany błąd') => {
        handleLoading(true);
        let isError = false;
        const baseInitBlock = {
            method,
            headers: {
                ...headers,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const initBlock = body === null ? baseInitBlock : {...baseInitBlock, body: JSON.stringify(body)};
        fetch(`${SERVER_URL}/${pathSuffix}`, initBlock)
            .then((response) => {
                    handleLoading(false);
                    if (ERROR_STATUS_CODES.includes(response.status)) {
                        throw new Error(ERROR_MESSAGE_LOOKUP[response.status]);
                    }
                    return response.json();
                }
            ).then(responseBody => {
            if (isError && responseBody && responseBody.message) {
                handleError(responseBody.message);
            } else if (isError) {
                handleError(defaultErrorMessage);
            } else {
                handleSuccess(responseBody);
            }
        }).catch(error => {
            if (error.message) {
                handleError(error.message)
            } else {
                handleError(defaultErrorMessage);
            }
        });
    }
;

export const withTokenFetchFromApi = (token) => (method, pathSuffix, handleLoading, handleError, handleSuccess, body, headers = {'Authorization': 'Bearer ' + token}, defaultErrorMessage = 'Nieznany błąd') =>
    fetchFromApi(method, pathSuffix, handleLoading, handleError, handleSuccess, body, headers, defaultErrorMessage);
