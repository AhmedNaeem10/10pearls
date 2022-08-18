import { ActionTypes } from '../constants/action-types';

const initialState = [
    { id: 0, workerName: "Bilal", workerId: 1, userId: 1, userName: "haris", time: "10:00", status: false },
    { id: 1, workerName: "Ali", workerId: 2, userId: 1, userName: "ahmed", time: "9:00", status: true },
    { id: 2, workerName: "Shoaib", workerId: 8, userId: 1, userName: "sara", time: "12:00", status: false }
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
                    workerName: payload.workerName,
                    workerId: payload.workerId,
                    user: payload.user,
                    time: payload.time,
                    status: false
                }
            ]

        default:
            return state;
    }
}