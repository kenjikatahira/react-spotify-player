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

    const renderView = () => {
        if(isLogged) {
            return (
                <Main />
            )
        } else {
            return (
                <Login onLogin={onLogin}/>
            )
        }
    }

    return (
        <div className={isLogged ? 'app' : 'app login'}>
            {renderView()}
        </div>
    )
}

export default App;
