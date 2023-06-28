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
        return parseInt(expires);
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
    const allowedUnits = ['hour', 'day'];
    if(allowedUnits.includes(unit)){
        return unit;
    }

    console.warn(`PiaJS: unit "${unit}" is not recognized.`);
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