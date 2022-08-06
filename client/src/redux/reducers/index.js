import { combineReducers } from 'redux';
import { serviceReducer } from './serviceReducer'
import { workerReducer } from './workerReducer';
const reducers = combineReducers({
    allServices: serviceReducer,
    allWorkers: workerReducer
})
export default reducers;
