import { delay } from "../utils"

export function logger({ getState }) {
    return next => action => {
        // console.log('will dispatch', action)
        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)
        console.log(action)
        // console.log('state after dispatch', getState())
        return returnValue
    }
}
