import {SERVER_URL} from "../config";

export const API_METHODS = {
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  GET: 'GET',
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
        return response.json();
    }).then(responseBody => {
        if (isError && responseBody && responseBody.message) {
            handleError(responseBody.message);
        } else if (isError) {
            handleError(defaultErrorMessage);
        } else {
            handleSuccess(responseBody);
        }
    }).catch(error => {
        console.error(error);
        if (error.message) {
            handleError(error.message)
        } else {
            handleError(defaultErrorMessage);
        }
    });
};

export const withTokenFetchFromApi = (token, logout) => (method, pathSuffix, handleLoading, handleError, handleSuccess, body, headers = {'Authorization': 'Bearer ' + token}, defaultErrorMessage = 'Nieznany błąd') =>
    fetchFromApi(method, pathSuffix, handleLoading, handleError, handleSuccess, body, headers, defaultErrorMessage);
