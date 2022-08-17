import { ActionTypes } from '../constants/action-types';
const initialState = {
    workers: []
}
export const workerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_WORKER:
            return { ...state, workers: payload };
        default:
            return state;
    }
}
export const selectedWorkerReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_WORKER:
            return { ...state, ...payload };
        default:
            return state;
    }
}

