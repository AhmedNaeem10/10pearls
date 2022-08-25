import { combineReducers } from 'redux';
import { requestReducer } from './requestReducer';
import { selectedServiceReducer, serviceReducer } from './serviceReducer'
import { userReducer } from './userReducer';
import { selectedWorkerReducer, workerReducer } from './workerReducer';
const reducers = combineReducers({
    allServices: serviceReducer,
    service: selectedServiceReducer,
    allWorkers: workerReducer,
    worker: selectedWorkerReducer,
    allRequests: requestReducer,
    user: userReducer
})
export default reducers;
