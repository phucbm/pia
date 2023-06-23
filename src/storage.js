import {isExpired} from "./expiration-check";
import {log} from "./utils";

/**
 * Set item
 * @param key
 * @param value
 */
export function setItem(key, value){
    const storageType = value.storageType;
    const string = JSON.stringify(value);

    // check existence
    const existingValue = getItem(key);
    if(existingValue !== null){
        const oldStorage = existingValue.storageType;
        if(oldStorage !== storageType){
            // remove if is existed in storage
            log('log', `[${key}] in ${oldStorage} has been removed to save new value in ${storageType}.`);
            remove(key);
        }else{
            log('log', `[${key}] updated.`);
        }
    }

    // set
    switch(storageType){
        case 'sessionStorage':
            sessionStorage.setItem(key, string);
            break;
        default:
            localStorage.setItem(key, string);
    }

    log('log', 'SET', value)
}

/**
 * Get item by key
 * @param key
 * @returns {string|null|any}
 */
export function getItem(key){
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
    value = JSON.parse(value);

    // check expires
    if(!isExpired(value)){
        log('log', `[${key}] is not expired`)
        return value;
    }

    // remove expired item
    removeByFormattedValue(value);
    log('log', `[${key}] has been removed due to expired on [${value.expires}]`);

    return null;
}

/**
 * Remove by key
 * @param key
 * @returns {boolean}
 */
export function remove(key){
    return removeByFormattedValue(getItem(key));
}

/**
 * Remove by formatted value
 * @param value
 * @returns {boolean}
 */
function removeByFormattedValue(value){
    if(value !== null){
        switch(value.storageType){
            case 'sessionStorage':
                sessionStorage.removeItem(value.key);
                break;
            default:
                localStorage.removeItem(value.key);
        }

        return true;
    }

    return false;
}