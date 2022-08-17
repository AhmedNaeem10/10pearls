import { ActionTypes } from "../constants/action-types"

export const addRequest = (request) => {
    return {
        type: ActionTypes.ADD_REQUEST,
        payload: request
    }
}