import { ActionTypes } from "../constants/action-types"

export const setWorkers = (workers) => {
    return {
        type: ActionTypes.SET_WORKER,
        payload: workers,
    };
};
export const selectedWorker = (worker) => {
    return {
        type: ActionTypes.SELECTED_WORKER,
        payload: worker,
    }
}