import {createStore , applyMiddleware, combineReducers , compose} from 'redux';
import {thunk} from 'redux-thunk';
import { AuthReducer } from "./reducer/AuthReducer";
import { SettingReducer } from './reducer/SettingReducer';
import { PermissionReducer } from './reducer/PermissionReducer';
import { CategoryReducer } from './reducer/CategoryReducer';
import { ProductReducer } from './reducer/ProductReducer';

const rootReducer = combineReducers({
    AuthReducer ,
    SettingReducer ,
    PermissionReducer ,
    CategoryReducer ,
    ProductReducer ,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = window.globalConfig.APP_DEBUG ? createStore(rootReducer ,   composeEnhancers(applyMiddleware(thunk))) : createStore(rootReducer ,   applyMiddleware(thunk) );