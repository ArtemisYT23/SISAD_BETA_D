import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./models";
import { AuthGuard } from "./guards";
import RoutesNotFound from "./utilities/RoutesNotFound";
import store from "./redux";
import Navbar from "./components/NavBar/Navbar";
import LoadingApp from "./utilities/LoadingApp";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import('./pages/Private/Private'));

function App() {
  return (
    <div>
      <Suspense fallback={<LoadingApp />}>
        <Provider store={store()}>
          <BrowserRouter>
            <RoutesNotFound>
              <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />}/>
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard />}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />}/>
              </Route>
            </RoutesNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
