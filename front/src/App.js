import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import HeaderComp from "components/header/HeaderComp";
import { NotifyContainer } from "components/public/NotificationComp";
import CartSideMenuComp from "components/cartSideMenu/CartSideMenuComp";
import SideMenuComp from "components/SideMenu/SideMenuComp";
import SearchPage from "pages/SearchPage";

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
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
