import {getDate} from "./utils"

/**
 * Get expires from input
 * @param expires
 * @returns {string}
 */
export function getValidatedExpires(expires){
    let validatedExpires = '';

    // string
    if(typeof expires === 'string'){
        switch(expires){
            case 'session':
            case 'tab':
            case 'current-tab':
                validatedExpires = 'session';
                break;
            default:
                validatedExpires = 'never';
        }
    }

    // number
    if(typeof expires === 'number'){
        expires = parseInt(expires);
        validatedExpires = getDate(expires);
    }

    // session, never, date mm/dd/yyyy
    return validatedExpires;
}


/**
 * Get storage type by validated expires
 * @param expires
 * @returns {string}
 */
export function getStorageTypeByExpires(expires){
    return expires === 'session' ? 'sessionStorage' : 'localStorage'
}