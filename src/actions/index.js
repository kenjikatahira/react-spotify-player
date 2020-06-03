import Auth from './../auth';
import { spotify } from './../service';
const { setSession, Logout, isAuthenticated } = new Auth();

/**
 * Responsavel por trazer os dados do usuario
 * @function getAll
 *
 */
export const getAll = () => {
    return dispatch => {
        spotify().then(data => {
            const formatedData = {
                user : data[0].data,
                currentTrack : data[1].data || false
            }
            console.log(formatedData)
            dispatch({type: 'GET_DATA', payload : formatedData})
        });
    }
}

/**
 * Verifica se o usuario está logado
 * @function isLogged
 *
 */
export const isLogged = () => {
    return dispatch => {
        dispatch({
            type : 'ISLOGGED',
            payload : isAuthenticated()
        });
    }
}

/**
 * Flag para verificar se o usuario está logado
 * @function login
 *
 */
export const login = (response) => {
    return dispatch => {
        setSession(response);
        dispatch({
            type : 'LOGIN',
            payload : true
        });
    }
}


/**
 * Responsavel por deslogar usuario
 * @function logout
 *
 */
export const logout = () => {
    return dispatch => {
        Logout();
        dispatch({
            type : 'LOGOUT',
            payload : false
        });
    }
}
