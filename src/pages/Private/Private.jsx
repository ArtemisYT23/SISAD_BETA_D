import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import { PrivateRoutes } from "../../models";
import RoutesNotFound from "../../utilities/RoutesNotFound";
import styled from "styled-components";
// import Documentary from "./Documentary/Documentary";
// import { setRefreshLoginUserTocken } from "../../redux/states/LoginUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Documentary from "./Documentary/Documentary";
import Managment from "./Managment/Managment";
import Recycler from "./Recycler/Recycler";
import Analityc from "./Analityc/Analityc";
import { AuthLogout } from "../../guards/auth.logout";

function Private() {
  const dispatch = useDispatch();
  const { sesion, userSesion } = useSelector((store) => store);
  const { SesionActive } = sesion;
  const { hoursDuration } = userSesion;

  // const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
  // const Documentary = lazy(() => import("./Documentary/Documentary"));
  // const Managment = lazy(() => import("./Managment/Managment"));
  // const Recycler = lazy(() => import("./Recycler/Recycler"));

  // useEffect(() => {
  //   if (SesionActive) {
  //     dispatch(setRefreshLoginUserTocken(SesionActive));
  //   }
  // }, []);

  return (
    <Content>
      <Navbar />
      {hoursDuration != null && <AuthLogout sessionTimeout={hoursDuration} />}
      <RoutesNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DOCUMENTARY} />} />
        <Route path={`${PrivateRoutes.DASHBOARD}/*`} element={<Dashboard />} />
        <Route path={PrivateRoutes.DOCUMENTARY} element={<Documentary />} />
        <Route path={`${PrivateRoutes.MANAGMENT}/*`} element={<Managment />} />
        <Route path={`${PrivateRoutes.RECICLER}/*`} element={<Recycler />} />
        <Route path={PrivateRoutes.ANALITYC} element={<Analityc />} />
      </RoutesNotFound>
    </Content>
  );
}

export default Private;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: start;
  @media (max-width: 767px) {
    flex-direction: column;
    flex-flow: row wrap-reverse;
  }
`;
