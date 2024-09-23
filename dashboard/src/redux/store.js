import {createStore , applyMiddleware, combineReducers , compose} from 'redux';
import {thunk} from 'redux-thunk';
import { AuthReducer } from "./reducer/AuthReducer";
import { SettingReducer } from './reducer/SettingReducer';
import { PermissionReducer } from './reducer/PermissionReducer';
import { CategoryReducer } from './reducer/CategoryReducer';

const rootReducer = combineReducers({
    AuthReducer ,
    SettingReducer ,
    PermissionReducer ,
    CategoryReducer ,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = window.globalConfig.APP_DEBUG ? createStore(rootReducer ,   composeEnhancers(applyMiddleware(thunk))) : createStore(rootReducer ,   applyMiddleware(thunk) );