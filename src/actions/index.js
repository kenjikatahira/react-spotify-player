import { setSession,getSession, removeSession,isAuthenticated } from '../utils';
import { getData,updateData } from './../service';
import delay from 'delay';
/**
 * Responsavel por trazer os dados do usuario
 * @function getAll
 *
 */
export const getAll = () => {
    return dispatch => {
        getData().then((responses) => {
        const [user,currentTrack,topArtist,recently,player_devices] = responses;
        const obj = {
            user : user.data,
            currentTrack : (currentTrack || {}).data || ((recently || {}).data || {}).items[0].track || {},
            topArtist : (topArtist || {}).data,
            recently : (recently || {}).data,
            player_devices : (player_devices || {}).data
        }

        dispatch({type: 'GET_DATA', payload : obj});
        }).catch(err => {
            console.log(`actions ${err}`)
        })
    }
}

export const update = () => {
    return async dispatch => {
        await delay(500);
        updateData().playing().then(response => {
            const {data} = response;
            dispatch({type : 'UPDATE_CURRENT_TRACK' , payload : { currentTrack : data }});
        }).catch(err => {
            console.log(`actions ${err}`)
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
            payload : {
                status : isAuthenticated(),
                access_token : getSession().access_token
            }
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
            payload : {
                status : true,
                access_token : getSession().access_token
            }
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
            payload : {
                status : false,
                access_token : false
            }
        });
    }
}
