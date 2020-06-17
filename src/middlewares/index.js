/**
 *
 * Loga as actions e states do redux
 * @function Logger
 *
 */
export const logger = (store => next => action => {
    let result = next(action)
    // console.log(action.type, result)
    return result
});
