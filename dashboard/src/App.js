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

                  <Route path="/permission" element={<PermissionPage/>} />
                  <Route path="/category" element={<CategoryPage/>} />

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
