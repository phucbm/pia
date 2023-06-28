import {isRecordExpired} from "./expiration-check";
import {
    getExpiresAndUnit,
    getStorageTypeByExpires,
    getValidatedExpiresUnit,
    getValidatedExpiresValue
} from "./validate";


export function getInitialRecordValue(key, value, options = {}){
    const config = {
        expires: 'never', // "session", "never", "1 day", "2 hours", (int)number
        ...options
    };

    const extractExpiresUnit = getExpiresAndUnit(config.expires);
    const unit = getValidatedExpiresUnit(extractExpiresUnit.unit);
    const expires = getValidatedExpiresValue(extractExpiresUnit.expires);
    const storageType = getStorageTypeByExpires(expires);

    return {
        key,
        valueType: typeof value,
        value,
        raw_expires: config.expires,
        expires,
        unit,
        storageType,
        arguments,
        createdDate: new Date().toString()
    };
}


/**
 * Set item
 * @param key
 * @param value
 */
export function setRecord(key, value){
    const storageType = value.storageType;
    const string = JSON.stringify(value);

    // check existence
    if(getRecord(key)?.storageType !== storageType){
        // not allow the same key in both local and session storage
        // remove current record
        removeRecord(key);
    }else{
        // override record
    }

    // set record
    if(storageType === 'sessionStorage'){
        sessionStorage.setItem(key, string);
    }else{
        localStorage.setItem(key, string);
    }
}

/**
 * Get item by key
 * @param key
 * @param returnFullValue
 * @returns {string|null|any}
 */
export function getRecord(key, returnFullValue = false){
    // check local storage by default
    let value = localStorage.getItem(key);

    // check session storage
    if(value === null){
        value = sessionStorage.getItem(key);
    }

    // null
    if(value === null){
        return value;
    }

    // parse JSON
    const record = JSON.parse(value);

    // check expires
    if(!isRecordExpired(record)){
        // return value if it has not expired yet
        return returnFullValue ? record : record.value;
    }

    // remove expired item and return null
    removeRecord(record.key, record.storageType);
    return null;
}

/**
 * Remove by key
 * @param key
 * @param storageType
 * @returns {boolean}
 */
export function removeRecord(key, storageType = 'localStorage'){
    if(storageType === 'sessionStorage'){
        sessionStorage.removeItem(key);
    }else{
        localStorage.removeItem(key);
    }
}