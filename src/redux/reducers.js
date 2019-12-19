
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './utils/history';


//Global Reducers
import authReducer from './modules/reducers/authReducer'

export default function createReducer(injectedReducers={}){
    const rootReducer = combineReducers({        
        authReducer,
        router: connectRouter(history),
        ...injectedReducers
    })
 const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}