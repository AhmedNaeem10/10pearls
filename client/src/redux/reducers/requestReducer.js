import { ActionTypes } from '../constants/action-types';

const initialState = [
    { id: 0, worker: 1, user: 1, status: false },
    { id: 1, worker: 2, user: 1, status: true },
    { id: 2, worker: 3, user: 1, status: false }
]
function nextRequestId(requests) {
    const maxId = requests.reduce((maxId, request) => Math.max(request.id, maxId), -1)
    return maxId + 1
}
export const requestReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_REQUEST:
            return [
                ...state,
                {
                    id: nextRequestId(state),
                    worker: payload.worker,
                    user: payload.user,
                    status: false
                }
            ]

        default:
            return state;
    }
}