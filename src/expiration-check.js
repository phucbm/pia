import {getDiff} from "./datetime";

/**
 * Check expires by formatted value
 * @param record
 * @returns {boolean}
 */
export function isRecordExpired(record){
    if(!record) return false;

    // never expired
    const neverExpired = ['session', 'never'];
    if(neverExpired.includes(record.expires)){
        return false;
    }

    // check by unit
    switch(record.unit){
        case 'times':
            return isExpiredTimesCheck(record);
        case 'hour':
        default:
            // day
            return isExpiredDateCheck(record);
    }
}

function isExpiredTimesCheck(record){
    // todo: check times
    return false;
}


function isExpiredDateCheck(record){
    const diffSinceCreated = getDiffSinceCreated(record);

    if(diffSinceCreated === null) return false;
    const allowance = record.expires;

    return diffSinceCreated > allowance;
}

export function getDiffSinceCreated(record){
    const hasLeftoverUnit = ['times', 'hour', 'day'];
    if(!hasLeftoverUnit.includes(record.unit)) return null;

    return getDiff(new Date(record.createdDate), new Date(), record.unit);
}