import service from './../service';
/**
 * Responsavel por trazer os dados de todos os paises
 * @function getCountries
 *
 */
export const getCountries = () => {
    return dispatch => {
        service.getList().then(({data}) => {
            dispatch({
                type : 'GET_COUNTRIES',
                payload : data
            });
        });
    }
}
