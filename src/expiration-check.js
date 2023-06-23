import {daysBetween, getDate} from "./utils";

/**
 * Check expires by formatted value
 * @param value
 * @returns {boolean}
 */
export function isExpired(value){

    console.log('isExpired', value)

    // never expired
    const neverExpired = ['session', 'never'];
    if(neverExpired.includes(value.expires)){
        return false;
    }

    // check by unit
    switch(value.unit){
        case 'times':
            return isExpiredTimesCheck(value);
        case 'hour':
            return isExpiredHourCheck(value);
        default:
            // day
            return isExpiredDayCheck(value.expires);
    }
}

function isExpiredTimesCheck(data){
    // todo: check times
    return false;
}

function isExpiredHourCheck(data){
    // todo: check hour
    console.log('isExpiredHourCheck', data)
    return false;
}

function isExpiredDayCheck(number_of_days){
    // todo: check day using UTC time
    const daysDiff = daysBetween(getDate(), number_of_days);
    return daysDiff < 0;
}