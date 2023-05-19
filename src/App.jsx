import { lazy } from "react";
// import { Provider } from "react-redux";
import { Navigate, Route, HashRouter } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./models";
import { AuthGuard } from "./guards";
import RoutesNotFound from "./utilities/RoutesNotFound";
// import store from "./redux";
import Navbar from "./components/NavBar/Navbar";
import LoadingApp from "./utilities/LoadingApp";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Private from "./pages/Private/Private";
import { ModalLogout } from "./utilities/Modal-logout";

// const Login = lazy(() => import("./pages/Login/Login"));
// const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
// const Private = lazy(() => import("./pages/Private/Private"));

function App() {

  return (
    <div>
      <HashRouter>
        <RoutesNotFound>
          <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route path={PublicRoutes.RESET} element={<ResetPassword />} />
          <Route element={<AuthGuard />}>
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
          </Route>
        </RoutesNotFound>
        <ModalLogout />
      </HashRouter>
    </div>
  );
}

export default App;
