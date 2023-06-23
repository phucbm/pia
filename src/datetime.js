// Calculate milliseconds in a year
function getNumberOfMs(type = ''){
    const second = 1000; // a second has 1000ms
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    const result = {second, minute, hour, day, year};

    // return specific value if type is set
    const acceptedTypes = ['year', 'day', 'hour', 'minute', 'second'];
    if(acceptedTypes.includes(type)){
        return result[type];
    }

    // return object
    return result;
}

// return ms since epoch of a date string or date object
function getMs(date){
    return Date.parse(typeof date === 'string' ? date : date.toString());
}

// get diff in ms of two dates
function getDiffMs(date1, date2){
    return getMs(date2) - getMs(date1);
}

// get diff of two dates by: second, minute, hour, day, year
export function getDiff(date1, date2, type){
    return Math.floor(getDiffMs(date1, date2) / getNumberOfMs(type));
}