import {getInitialRecordValue, getRecord, removeRecord, setRecord} from "./storage";
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

    // update value, keep other configs the same
    update(key, newValue){
        // stop updating if record is null
        if(!getRecord(key)){
            console.warn(`Updating undefined record "${key}" is not allowed.`);
            return;
        }

        const value = getRecord(key, true);

        // throw warning if mismatched value types
        if(typeof newValue !== value.valueType){
            console.warn(`Updating mismatched value types. Changing from ${value.valueType} to ${typeof newValue}.`);
        }

        // update value
        value.value = newValue;

        // override record
        setRecord(key, value);
    }

    // create a new record, override if the key is the same
    set(key, value, options = {}){
        setRecord(key, getInitialRecordValue(key, value, options));
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