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
    if(isAuthenticated()) {
        return {
            access_token : localStorage.getItem('access_token'),
            token_type : localStorage.getItem('token_type')
        }
    } else {
        removeSession();
        return {}
    }
}

export const set_device_id = (device_id) => {
    console.log('Ready - Device ID - Localstorage', device_id);
    localStorage.setItem('device_id', device_id);
}

export const get_device_id = () => {
    return localStorage.getItem('device_id')
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

export const formatTrackDuration = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

export const delay = async (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve,time);
    })
}

export const label = (uri) => {
    const dict = {
        home : 'Home',
        'recently-played' : 'Recently Played'
    }
    return dict[uri]
}
