import { BrowserRouter, redirect, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "pages/HomePage";
import HeaderComp from "components/header/HeaderComp";
import { NotifyContainer } from "components/public/NotificationComp";
import CartSideMenuComp from "components/sideMenu/cartSideMenu/CartSideMenuComp";
import SideMenuComp from "components/sideMenu/sideMenu/SideMenuComp";
import SearchPage from "pages/SearchPage";
import LoginPage from "pages/Auth/LoginPage";
import RegisterPage from "pages/Auth/RegisterPage";
import ForgetPasswordPage from "pages/Auth/ForgetPasswordPage";
import ResetPasswordPage from "pages/Auth/ResetPasswordPage";
import AccountPage from "pages/Account/AccountPage";
import AddressesPage from "pages/Account/AddressesPage";
import ProductPage from "pages/ProductPage";
import FooterComp from "components/footer/FooterComp";
import ContactPage from "pages/Static/ContactPage";
import FAQsPage from "pages/Static/FAQsPage";
import AboutPage from "pages/Static/AboutPage";
import LoadingComp from "components/public/LoadingComp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Auth_GetuserdataAction, Auth_VisitAction } from "./redux/action/AuthAction";
import { Category_ListAction } from "./redux/action/CategoryAction";
import FavoritePage from "pages/FavoritePage";
import { Favorite_ListAction } from "./redux/action/FavoriteAction";
import CartPage from "pages/CartPage";
import OrdersPage from "pages/Account/OrdersPage";
import PoliciesPage from "pages/Static/PoliciesPage";
import { Static_ReadAction } from "./redux/action/StaticAction";
import NotFoundPage from "pages/NotFoundPage";
import PaymentStatusPage from "pages/PaymentStatusPage";
import { Setting_readAction } from "./redux/action/SettingAction";
import ScrollOnNavigationComp from "components/public/ScrollOnNavigationComp";

function App() {
  const auth = useSelector(state=>state.AuthReducer)
  const setting = useSelector(state => state.SettingReducer)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(Auth_GetuserdataAction()).then(() => {
      dispatch(Auth_VisitAction())
      dispatch(Category_ListAction())

      if(location.pathname != '/favorite')
        dispatch(Favorite_ListAction(1,1))
    }).then(() => {
      dispatch(Static_ReadAction('policy'))
      dispatch(Static_ReadAction('contact'))
      dispatch(Setting_readAction())
    }) 
  } , [])

  // redirect to required navigation
  useEffect(() => {
    if(setting.redirect){
      navigate(setting.redirect)
      dispatch({type:"Setting_Data" , data : {redirect : null}})
    }
  } , [setting.redirect])

  return (
    <div className="min-h-[100vb] flex flex-col bg-mainbg">
      <div className="flex-1">


          {/* notifications container */}
          <NotifyContainer/>

          {/* scroll on navigation  */}
          <ScrollOnNavigationComp/>

          {/* app header */}
          <HeaderComp/>

          {/* cart side menu */}
          <CartSideMenuComp/>

          {/* side menu */}
          <SideMenuComp/>

          {/* loading comp */}
          <LoadingComp/>

          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/product/:id/:slug?" element={<ProductPage/>}/>
            <Route path="/favorite" element={<FavoritePage/>}/>

            {
              auth.token ? (
                <>
                  {/* user account router */}
                  <Route path="/auth/*" element={<AccountPage/>}/>
                  <Route path="/account" element={<AccountPage/>}/>
                  <Route path="/account/addresses" element={<AddressesPage/>}/>
                  <Route path="/account/orders" element={<OrdersPage/>}/>

                  <Route path="/cart" element={<CartPage/>}/>
                </>
              ) : (
                <>
                  {/* Authentication Routes */}
                  <Route path="/account/*" element={<LoginPage/>}/>
                  <Route path="/auth/login" element={<LoginPage/>} />
                  <Route path="/auth/register" element={<RegisterPage/>} />
                  <Route path="/auth/password/forget" element={<ForgetPasswordPage/>} />
                  <Route path="/auth/password/reset" element={<ResetPasswordPage/>} />
                </>
              )
            }

            {/* static pages  */}
            <Route path="/policies" element={<PoliciesPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/faqs" element={<FAQsPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>

            {/* payment status pages  */}
            <Route path="/payment/success" element={<PaymentStatusPage/>} />
            <Route path="/payment/fail" element={<PaymentStatusPage/>} />
            <Route path="/payment/pending" element={<PaymentStatusPage/>} />

            <Route path="/*" element={<NotFoundPage/>}/>
          </Routes>

      </div>

          <FooterComp/>
    </div>
  );
}

export default App;
