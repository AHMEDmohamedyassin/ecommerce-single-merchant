import {createStore , applyMiddleware, combineReducers , compose} from 'redux';
import {thunk} from 'redux-thunk';
import { AuthReducer } from "./reducer/AuthReducer";
import { SettingReducer } from './reducer/SettingReducer';
import { AddressReducer } from './reducer/AddressReducer';
import { ProductReducer } from './reducer/ProductReducer';
import { CartReducer } from './reducer/CartReducer';
import { ProductListReducer } from './reducer/ProductListReducer';
import { CategoryReducer } from './reducer/CategoryReducer';
import { FavoriteReducer } from './reducer/FavoriteReducer';
import { OrderReducer } from './reducer/OrderReducer';
import { HomeReducer } from './reducer/HomeReducer';
import { StaticReducer } from './reducer/StaticReducer';

const rootReducer = combineReducers({
    AuthReducer ,
    SettingReducer ,
    AddressReducer ,
    ProductReducer ,
    CartReducer ,
    ProductListReducer ,
    CategoryReducer ,
    FavoriteReducer ,
    OrderReducer , 
    HomeReducer ,
    StaticReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = window.globalConfig.APP_DEBUG ? createStore(rootReducer ,   composeEnhancers(applyMiddleware(thunk))) : createStore(rootReducer ,   applyMiddleware(thunk) );