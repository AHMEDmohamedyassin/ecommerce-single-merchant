import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div>
        <BrowserRouter>
          <NotifyContainer/>
          <HeaderComp/>
          {/* <CartSideMenuComp/> */}
          {/* <SideMenuComp/> */}
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/product" element={<ProductPage/>}/>

            {/* Authentication Routes */}
            <Route path="/auth/login" element={<LoginPage/>} />
            <Route path="/auth/register" element={<RegisterPage/>} />
            <Route path="/auth/password/forget" element={<ForgetPasswordPage/>} />
            <Route path="/auth/password/reset" element={<ResetPasswordPage/>} />

            {/* user account router */}
            <Route path="/account" element={<AccountPage/>}/>
            <Route path="/account/addresses" element={<AddressesPage/>}/>

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
