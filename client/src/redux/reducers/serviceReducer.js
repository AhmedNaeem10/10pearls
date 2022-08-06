import { ActionTypes } from '../constants/action-types';
const initialState = {
    services: []
}
export const serviceReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_SERVICES:
            return { ...state, services: payload };

        default:
            return state;
    }
}
