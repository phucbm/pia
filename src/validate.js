import {getFormattedDate} from "./utils"

/**
 * Get expires from input
 * @param expires
 * @param unit
 * @returns {*}
 */
export function getValidatedExpiresValue(expires, unit){
    // accepted values: "session", "never", (int)number

    // string
    if(typeof expires === 'string'){
        const acceptedSessionStrings = ['session', 'tab', 'current-tab'];
        if(acceptedSessionStrings.includes(expires)){
            return 'session';
        }
        return 'never';
    }

    // number
    if(typeof expires === 'number'){
        expires = parseInt(expires);
        switch(unit){
            case 'times':
            case 'hour':
                return expires;
            default:
                // day
                return getFormattedDate(expires);
        }
    }

    // invalid
    return false;
}


/**
 * Get expires unit
 * Return the accepted unit or false if the unit is not recognized
 * @param unit
 * @returns {boolean|*}
 */
export function getValidatedExpiresUnit(unit){
    const allowedUnits = ['times', 'hour', 'day'];
    if(allowedUnits.includes(unit)){
        return unit;
    }

    console.warn(`PiaJS: unit "${unit}" is not recognized. Accepted units are`, allowedUnits);
    return false;
}


/**
 * Get storage type by validated expires
 * @param expires
 * @returns {string}
 */
export function getStorageTypeByExpires(expires){
    return expires === 'session' ? 'sessionStorage' : 'localStorage'
}