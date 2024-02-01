/**
 * Get expires from input
 * @param expires
 * @returns {*}
 */
export function getValidatedExpiresValue(expires){
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

    //console.warn(`PiaJS: unit "${unit}" is not recognized.`);
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
 * Get expires and unit from input
 * @param input
 * @returns {{expires: (string|number), unit: string}}
 */
export function getExpiresAndUnit(input){
    let expires, unit;

    if(typeof input === 'string'){
        if(['session', 'never'].includes(input)){
            // "session" => {value:"session", unit:""}
            // "never"   => {value:"never", unit:""}
            expires = input;
        }else{
            // "1 day"   => {value:1, unit:"day"}
            // "2 hours" => {value:2, unit:"hour"}
            const arrayValues = input.trim().split(' ');
            expires = parseInt(arrayValues[0]);

            switch(arrayValues[1]){
                case "day":
                case "days":
                    unit = "day";
                    break;
                case "hour":
                case "hours":
                    unit = "hour";
                    break;
            }
        }
    }

    // 1 => {value:1, unit:"day"}
    if(typeof input === 'number'){
        expires = input;
        unit = 'day';
    }

    return {expires, unit};
}