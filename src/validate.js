import {daysBetween, getDate} from "./utils"

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

    // accepted values: "session", "never", (int)number
    return validatedExpires;
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


/**
 * Check expires by formatted value
 * @param value
 * @returns {boolean}
 */
export function isExpired(value){
    switch(value.expires){
        case 'session':
        case 'never':
            // never expired
            return false;
        default:
            // check date
            const daysDiff = daysBetween(getDate(), value.expires);
            return daysDiff < 0;
    }
}