import { ActionTypes } from "../constants/action-types"

export const setServices = (services) => {
    return {
        type: ActionTypes.SET_SERVICES,
        payload: services,
    };
};
export const selectedServices = (service) => {
    return {
        type: ActionTypes.SELECTED_SERVICES,
        payload: service,
    }
}