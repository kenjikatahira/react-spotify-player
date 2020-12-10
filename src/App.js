import React, { useState, useEffect } from 'react';
import './style.scss';

import { setSession,getSession } from './utils';

import Login from './components/login';
import Main from './components/main';

const App = () => {
    const [isLogged,setIsLogged] = useState(false);

    // init
    useEffect(() => {
        if(getSession().access_token) {
            setIsLogged(true);
        }
    }, [])

    const onLogin = (response) => {
        setSession(response);
        setIsLogged(response.access_token ? true : false)
    }

    if(isLogged) {
        return (
            <div className="app">
                <Main />
            </div>
        )
    } else {
        return (
            <div className="app">
                <Login onLogin={onLogin}/>
            </div>
        )
    }
}

export default App;
