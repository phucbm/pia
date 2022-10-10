import {getStorageTypeByExpires, getValidatedExpires} from "./validate";
import {getItem, remove, setItem} from "./storage";


/**
 * Private class
 */
class Pia{
    constructor(){
    }

    set(key, value, options){
        const config = {
            expires: 'local', // local, session, int
            ...options
        };

        const expires = getValidatedExpires(config.expires);
        const storageType = getStorageTypeByExpires(expires);

        const formattedObject = {
            key,
            valueType: typeof value,
            value,
            expires,
            storageType,
            arguments,
        };

        // set Item
        setItem(key, formattedObject);
    }

    get(key){
        console.log('GET', getItem(key))
        return getItem(key);
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