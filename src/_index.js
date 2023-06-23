import {
    getStorageTypeByExpires,
    getValidatedExpiresUnit,
    getValidatedExpiresValue
} from "./validate";
import {getRecord, removeRecord, setRecord} from "./storage";
import {getDiffSinceCreated, isRecordExpired} from "./expiration-check";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";


/**
 * Private class
 */
class Pia{
    constructor(){
    }

    isExpired(key){
        return isRecordExpired(getRecord(key));
    }

    test(key){
        const record = getRecord(key, true);
        let testRecord = '';

        if(record){
            const leftover = typeof record.expires === 'number' ? `${record.expires - getDiffSinceCreated(record)} ${record.unit}` : record.expires;
            testRecord = {
                leftover,
                record
            };
        }else{
            testRecord = `Record "${key}" not found.`;
        }

        console.group(`Test record:`, key);
        console.log(testRecord);
        console.groupEnd();
    }

    set(key, value, options = {}){
        const config = {
            expires: 'never', // "session", "never", (int)number
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
            createdDate: new Date().toString()
        };

        // set Item
        setRecord(key, formattedObject);
    }

    get(key, returnFullValue = false){
        return getRecord(key, returnFullValue);
    }

    remove(key){
        return removeRecord(key);
    }
}

/**
 * Public library object
 * access via window.Pia
 */
window.Pia = new Pia();