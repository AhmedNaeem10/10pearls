import { combineReducers } from 'redux';
import { serviceReducer } from './serviceReducer'
const reducers = combineReducers({
    allServices: serviceReducer
})
export default reducers;
