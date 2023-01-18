import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import { PrivateRoutes } from "../../models";
import RoutesNotFound from "../../utilities/RoutesNotFound";
import styled from "styled-components";

function Private() {
  const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
  const Documentary = lazy(() => import("./Documentary/Documentary"));
  const Managment = lazy(() => import("./Managment/Managment"));
  const Recycler = lazy(() => import("./Recycler/Recycler"));

  return (
    <Content>
        <Navbar />
      <RoutesNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DOCUMENTARY} />} />
        <Route path={`${PrivateRoutes.DASHBOARD}/*`} element={<Dashboard />} />
        <Route path={PrivateRoutes.DOCUMENTARY} element={<Documentary />} />
        <Route path={`${PrivateRoutes.MANAGMENT}/*`} element={<Managment />} />
        <Route path={`${PrivateRoutes.RECICLER}/*`} element={<Recycler />} />
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
    flex-flow: row wrap-reverse
  }
`;
