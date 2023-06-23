import {
    getStorageTypeByExpires,
    getValidatedExpires,
    getValidatedExpiresUnit,
    getValidatedExpiresValue
} from "./validate";
import {getItem, remove, setItem} from "./storage";
import {getDate, log} from "./utils";


/**
 * Private class
 */
class Pia{
    constructor(){
    }

    set(key, value, options){
        const config = {
            expires: 'local', // local, session, int
            unit: 'day', // times, hour, day
            ...options
        };

        const unit = getValidatedExpiresUnit(config.unit);
        const expires = getValidatedExpiresValue(config.expires, unit);
        const storageType = getStorageTypeByExpires(expires);

        const formattedObject = {
            key,
            valueType: typeof value,
            value,
            expires,
            unit,
            storageType,
            arguments,
            createdDate: getDate()
        };

        // set Item
        setItem(key, formattedObject);
    }

    get(key, returnFullValue = false){
        const value = getItem(key);

        if(value !== null){
            if(returnFullValue){
                log('log', 'GET', value);
                return value;
            }else{
                log('log', 'GET', value.value);
                return value.value;
            }
        }

        log('log', 'GET', value);
        return value;
    }

    remove(key){
        return remove(key);
    }
}

/**
 * Public library object
 * access via window.Pia
 */
window.Pia = new Pia();