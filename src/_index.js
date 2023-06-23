import {
    getStorageTypeByExpires,
    getValidatedExpiresUnit,
    getValidatedExpiresValue
} from "./validate";
import {getRecord, removeRecord, setRecord} from "./storage";
import {getDiffSinceCreated, isRecordExpired} from "./expiration-check";


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
        const leftover = typeof record.expires === 'number' ? `${record.expires - getDiffSinceCreated(record)} ${record.unit}` : record.expires;

        const testRecord = {
            leftover,
            record
        };

        console.group(`Test record:`, key);
        console.log(testRecord);
        console.groupEnd();
    }

    set(key, value, options){
        console.log('set', key)
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