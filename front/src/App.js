import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import ExchangePolicyPage from "pages/Static/ExchangePolicyPage";
import ShippingPoliciesPage from "pages/Static/ShippingPoliciesPage";
import ContactPage from "pages/Static/ContactPage";
import FAQsPage from "pages/Static/FAQsPage";
import AboutPage from "pages/Static/AboutPage";
import LoadingComp from "components/public/LoadingComp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Auth_GetuserdataAction, Auth_VisitAction } from "./redux/action/AuthAction";
import { Cart_Initiate } from "./redux/action/CartAction";
import { Category_ListAction } from "./redux/action/CategoryAction";
import FavoritePage from "pages/FavoritePage";
import { Favorite_ListAction } from "./redux/action/FavoriteAction";
import CartPage from "pages/CartPage";

function App() {
  const auth = useSelector(state=>state.AuthReducer)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(Auth_GetuserdataAction()).then(() => {
      dispatch(Auth_VisitAction())
      dispatch(Category_ListAction())

      if(location.pathname != '/favorite')
        dispatch(Favorite_ListAction(1,1))
    })
  } , [])
  return (
    <div>

          {/* notifications container */}
          <NotifyContainer/>

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
            <Route path="/product/:id" element={<ProductPage/>}/>
            <Route path="/favorite" element={<FavoritePage/>}/>

            {
              auth.token ? (
                <>
                  {/* user account router */}
                  <Route path="/auth/*" element={<AccountPage/>}/>
                  <Route path="/account" element={<AccountPage/>}/>
                  <Route path="/account/addresses" element={<AddressesPage/>}/>

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
            <Route path="/exchange-policies" element={<ExchangePolicyPage/>}/>
            <Route path="/shipping-policies" element={<ShippingPoliciesPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/faqs" element={<FAQsPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>

          </Routes>

          <FooterComp/>
    </div>
  );
}

export default App;
