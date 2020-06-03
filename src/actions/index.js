import service from './../service';
import { setSession,logout as Logout, isAuthenticated } from './../auth';

/**
 * Responsavel por trazer os dados do usuario
 * @function getUser
 *
 */
export const getUser = () => {
    return dispatch => {
        service.getUser().then(({data}) => {
            dispatch({
                type : 'GET_USER',
                payload : data
            });
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
