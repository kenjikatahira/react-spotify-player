export const setSession = ({access_token,token_type,expires_in}) => {
    const expires_at = new Date().valueOf() + 3600000;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('token_type', token_type);
    localStorage.setItem('expires_in', expires_in);
    localStorage.setItem('expires_at', expires_at);
    console.log('setsession')
}

export const removeSession = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('expires_at');
    console.log('removesession')
}

export const getSession = () => {
    return {
        access_token : localStorage.getItem('access_token'),
        token_type : localStorage.getItem('token_type')
    }
}

export const isAuthenticated = () => {
    let expires_at = JSON.parse(localStorage.getItem('expires_at'));
    return expires_at && new Date().valueOf() < expires_at;
}

export const orderList = (item,arr) => {
    const key = arr.indexOf(item)
    let before = [],newArr = [], found = false;
    arr.forEach((n,i) => {
        if(i === key) found = true;
        if(!found) {
            before.push(n);
        } else {
            if(!newArr.includes(n)) {
                newArr.push(n);
            }
        }
    });

    before.forEach(i => {
        newArr.push(i);
    });

    return newArr;
}

export const formatTrackDuration = (duration) => {
    let day, hour, minute, seconds;
    seconds = Math.floor(duration / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return hour ? `${hour} hr ${minute} min`:`${minute}:${seconds}`;
}
