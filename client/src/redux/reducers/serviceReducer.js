import { ActionTypes } from '../constants/action-types';
const initialState = {
    services: [
        {
            id: 1,
            title: "maid"
        },
        {
            id: 2,
            title: "chef"
        }
    ]
}
export const serviceReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_SERVICES:
            return state;

        default:
            return state;
    }
}
