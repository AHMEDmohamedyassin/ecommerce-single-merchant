import HeaderComp from "components/header/HeaderComp";
import { NotifyContainer } from "components/public/NotificationComp";
import SideMenuComp from "components/sideMenu/SideMenuComp";
import DashboardPage from "./pages/DashboardPage";
import ListPage from "./pages/product/ListPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth_GetuserdataAction } from "./redux/action/AuthAction";
import SessionExpiredPage from "./pages/SessionExpiredPage";
import LoadingComp from "components/public/LoadingComp";
import PermissionPage from "pages/PermissionPage";
import CategoryPage from "pages/CategoryPage";
import CreatePage from "pages/product/CreatePage";
import UpdatePage from "pages/product/UpdatePage";
import UserCreatePage from "pages/user/CreatePage";
import UserUpdatePage from "pages/user/UpdatePage";
import UserListPage from "pages/user/ListPage";
import CouponPage from "pages/CouponPage";
import StoreAddressCreatePage from "pages/store_address/CreatePage";
import StoreAddressUpdatePage from "pages/store_address/UpdatePage";
import StoreAddressListPage from "pages/store_address/ListPage";
import OrderCreatePage from "pages/order/CreatePage";

function App() {
  const state = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Auth_GetuserdataAction())
  } ,[])
  return (
    <div className="bg-mainbg">
        <BrowserRouter>

          {/* notifications container */}
          <NotifyContainer/>

          {/* header component  */}
          <HeaderComp/>

          {/* side menu component */}
          <SideMenuComp/>

          {/* loading component */}
          <LoadingComp/>


          {/* pages  */}
          <Routes>
            {
              state.token ? (
                <>
                  <Route path="/" element={<DashboardPage/>} />
                  <Route path="/products" element={<ListPage/>} />
                  <Route path="/product/create" element={<CreatePage/>} />
                  <Route path="/product/update/:id" element={<UpdatePage/>} />

                  <Route path="/users" element={<UserListPage/>} />
                  <Route path="/user/create" element={<UserCreatePage/>} />
                  <Route path="/user/update/:id" element={<UserUpdatePage/>} />

                  <Route path="/coupon" element={<CouponPage/>} />

                  <Route path="/permission" element={<PermissionPage/>} />
                  <Route path="/category" element={<CategoryPage/>} />

                  <Route path="/store-address" element={<StoreAddressListPage/>} />
                  <Route path="/store-address/create" element={<StoreAddressCreatePage/>} />
                  <Route path="/store-address/update/:id" element={<StoreAddressUpdatePage/>} />

                  <Route path="/order/create" element={<OrderCreatePage/>} />
                </>
              ) : <>
                <Route path="/*" element={<SessionExpiredPage/>} />
              </>
            }
          </Routes>


        </BrowserRouter>
    </div>
  );
}

export default App;
