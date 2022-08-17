import { combineReducers } from 'redux';
import { requestReducer } from './requestReducer';
import { selectedServiceReducer, serviceReducer } from './serviceReducer'
import { selectedWorkerReducer, workerReducer } from './workerReducer';
const reducers = combineReducers({
    allServices: serviceReducer,
    service: selectedServiceReducer,
    allWorkers: workerReducer,
    worker: selectedWorkerReducer,
    allRequests: requestReducer
})
export default reducers;
