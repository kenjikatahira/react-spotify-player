/**
 *
 * Loga as actions e states do redux
 * @function Logger
 *
 */
export const logger = (store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
});

/**
 *
 * Modela os dados do redux
 * @function player
 *
 */
export const player = (store => next => action => {
    let result = next(action);
    // console.log('------', result);
    return result
});
