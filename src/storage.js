export function setItem(key, value){
    const storageType = value.storageType;
    const string = JSON.stringify(value);

    // check existence
    const existingValue = getItem(key);
    if(existingValue !== null){
        const oldStorage = existingValue.storageType;
        if(oldStorage !== storageType){
            // remove if is existed in storage
            console.log(`[${key}] in ${oldStorage} has been removed to save new value in ${storageType}.`);
            remove(key);
        }else{
            console.log(`[${key}] updated.`);
        }
    }

    // set
    switch(storageType){
        case 'sessionStorage':
            sessionStorage.setItem(key, string);
            break;
        default:
            localStorage.setItem(key, string);
    }

    console.log('SET', value)
}

export function getItem(key){
    // check local storage by default
    let value = localStorage.getItem(key);

    // check session storage
    if(value === null){
        value = sessionStorage.getItem(key);
    }

    // null
    if(value === null){
        return value;
    }

    // parse value from JSON
    return JSON.parse(value);
}

export function remove(key){
    const value = getItem(key);

    if(value !== null){
        switch(value.storageType){
            case 'sessionStorage':
                sessionStorage.removeItem(key);
                break;
            case 'localStorage':
                localStorage.removeItem(key);
                break;
        }

        return true;
    }

    return false;
}