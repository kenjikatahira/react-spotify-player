import { Storage } from '../utils';
import { spotify } from './../service';
const { setSession,removeSession,isAuthenticated } = new Storage();

/**
 * Responsavel por trazer os dados do usuario
 * @function getAll
 *
 */
export const getAll = () => {
    return dispatch => {
        spotify().then((responses) => {
        const [user,currentTrack,topArtist] = responses;
            const obj = {
                user : user.data,
                currentTrack : (currentTrack || {}).data || false,
                topArtist : (topArtist || {}).data || false
            }
            console.log(obj)
            dispatch({type: 'GET_DATA', payload : obj});
        }).catch(err => {
            console.log(`actions ${err}`)
        })
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
        removeSession();
        dispatch({
            type : 'LOGOUT',
            payload : false
        });
    }
}
