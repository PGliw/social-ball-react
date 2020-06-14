export function notNullOrEmptyValues(obj) {
    let state = true;
    if (!obj) {
        return false;
    }
    for (let key in Object.keys(obj)) {
        if ( !( obj[key] === null || obj[key] === "" ) ) {
            state = false;
            break;
        }
    }
    return state;
}

export const formatDate = (date) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('pl-PL', options);
};

export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};
