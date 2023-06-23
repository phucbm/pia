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

}

function isExpiredHourCheck(data){

}

function isExpiredDayCheck(number_of_days){
    const daysDiff = daysBetween(getDate(), number_of_days);
    return daysDiff < 0;
}