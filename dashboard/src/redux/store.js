import {createStore , applyMiddleware, combineReducers , compose} from 'redux';
import {thunk} from 'redux-thunk';
import { AuthReducer } from "./reducer/AuthReducer";
import { SettingReducer } from './reducer/SettingReducer';
import { PermissionReducer } from './reducer/PermissionReducer';
import { CategoryReducer } from './reducer/CategoryReducer';
import { ProductReducer } from './reducer/ProductReducer';
import { ProductListReducer } from './reducer/ProductListReducer';
import { UserReducer } from './reducer/UserReducer';
import { UserListReducer } from './reducer/UserListReducer';
import { CouponReducer } from './reducer/CouponReducer';
import { StoreAddressReducer } from './reducer/StoreAddressReducer';
import { OrderReducer } from './reducer/OrderReducer';
import { OrderListReducer } from './reducer/OrderListReducer';
import { StaticReducer } from './reducer/StaticReducer';
import { ReviewReducer } from './reducer/ReviewReducer';
import { ProductSubListReducer } from './reducer/ProductSubReducer';

const rootReducer = combineReducers({
    AuthReducer ,
    SettingReducer ,
    PermissionReducer ,
    CategoryReducer ,
    ProductReducer ,
    ProductListReducer ,
    UserReducer ,
    UserListReducer ,
    CouponReducer ,
    StoreAddressReducer ,
    OrderReducer ,
    OrderListReducer ,
    StaticReducer ,
    ReviewReducer ,
    ProductSubListReducer ,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = window.globalConfig.APP_DEBUG ? createStore(rootReducer ,   composeEnhancers(applyMiddleware(thunk))) : createStore(rootReducer ,   applyMiddleware(thunk) );