import HeaderComp from "components/header/HeaderComp";
import { NotifyContainer } from "components/public/NotificationComp";
import SideMenuComp from "components/sideMenu/SideMenuComp";
import DashboardPage from "pages/DashboardPage";
import ListPage from "pages/product/ListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "scripts/inputScript"
import "scripts/sidemenuScript"

function App() {
  return (
    <div className="bg-mainbg">
        <BrowserRouter>

          {/* notifications container */}
          <NotifyContainer/>

          {/* header component  */}
          <HeaderComp/>

          {/* side menu component */}
          <SideMenuComp/>

          <div data-animate="mainAppContainer" className="pe-[22px] ps-20">

            {/* pages  */}
            <Routes>
              <Route path="/" element={<DashboardPage/>} />
              <Route path="/products" element={<ListPage/>} />
            </Routes>

          </div>

        </BrowserRouter>
    </div>
  );
}

export default App;
