import service from './../service';

/**
 * Responsavel por trazer os dados do usuario
 * @function getUser
 *
 */
export const getUser = () => {
    return dispatch => {
        service.getUser().then(({data}) => {
            console.log(data)
            dispatch({
                type : 'GET_USER',
                payload : data
            });
        });
    }
}
