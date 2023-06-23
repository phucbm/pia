/**
 * Debounce (ignore all, run the last)
 * https://www.freecodecamp.org/news/javascript-debounce-example/
 * @param func
 * @param timeout
 * @returns {(function(...[*]): void)|*}
 */
export function debounce(func, timeout = 150){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


/**
 * Debounce leading (run the first, ignore the rest)
 * https://www.freecodecamp.org/news/javascript-debounce-example/
 * @param func
 * @param timeout
 * @returns {(function(...[*]): void)|*}
 */
export function debounceLeading(func, timeout = 150){
    let timer;
    return (...args) => {
        if(!timer){
            func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}


/**
 * Get array with unique values
 * https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 * @param array
 * @returns {*}
 */
export function arrayUnique(array){
    function onlyUnique(value, index, self){
        return self.indexOf(value) === index;
    }

    return array.filter(onlyUnique);
}


/**
 * Sort array of integers
 * @param array
 * @param asc
 * @returns {*}
 */
export function arraySortInteger(array, asc = true){
    return array.sort(function(a, b){
        return asc ? a - b : b - a;
    });
}


/**
 * Set CSS
 * @param target
 * @param props
 */
export function setCSS(target, props){
    Object.assign(target.style, props);
}


/**
 * Console log
 * @param type
 * @param message
 */
export function log(type = 'log', ...message){
    const enable = true;
    if(enable) console?.[type](...message);
}


/**
 * Generate unique ID
 */
export function uniqueId(prefix = ''){
    return prefix + (+new Date()).toString(16) +
        (Math.random() * 100000000 | 0).toString(16);
}


/**
 * Get today in format yyyy-mm-dd
 * @returns {string}
 */
export function getDate(shiftDays = 0){
    const date = new Date(Date.now());

    // shift days
    date.setDate(date.getDate() + shiftDays);

    // format
    const month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();
    return [year, month, day].join('-');
}


/**
 * Get number of days between two dates in format yyyy-mm-dd
 * @param startDate
 * @param endDate
 * @returns {number}
 */
export function daysBetween(startDate, endDate){
    const treatAsUTC = date => {
        const result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}