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

    set(key, value, options = {}){
        const config = {
            expires: 'never', // "session", "never", (int)number
            unit: 'day', // hour, day
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

    /**
     * Show console log with expiration info
     * @param key
     * @param log
     * @returns {string|{leftover: *[], record: (string|*)}}
     */
    test(key, log = false){
        const record = getRecord(key, true);
        let testRecord;
        const leftover = [];

        if(record){
            if(typeof record.expires === 'number'){
                leftover.push(`${record.expires - getDiffSinceCreated(record)} ${record.unit}(s) left`);

                // created xxx ago
                ['second', 'minute', 'hour', 'day'].forEach(unit => {
                    leftover.push(`created ${getDiffSinceCreated(record, unit)} ${unit}(s) ago`);
                });
            }else{
                leftover.push(record.expires);
            }

            testRecord = {
                leftover,
                record
            };
        }else{
            testRecord = `Record "${key}" not found.`;
        }

        if(log){
            console.group(`Test record:`, key);
            console.table(leftover);
            console.log('record', record);
            console.groupEnd();
        }

        return testRecord;
    }
}

/**
 * Public library object
 * access via window.Pia
 */
window.Pia = new Pia();