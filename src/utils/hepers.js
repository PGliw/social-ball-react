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
