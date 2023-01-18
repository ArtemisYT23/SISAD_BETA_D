import styled from "styled-components";
import AsideSecurity from "../../../components/Aside/AsideSecurity/AsideSecurity";
import { Navigate, Route } from "react-router-dom";
import RoutesNotFound from "../../../utilities/RoutesNotFound";
import { PrivateRoutes } from "../../../models";
import ConfigUser from "../../../components/ContentSecurity/ConfigUser/ConfigUser";
import ConfigPermision from "../../../components/ContentSecurity/ConfigPermision/ConfigPermision";
import ConfigResource from "../../../components/ContentSecurity/ConfigResource/ConfigResource";
import ConfigGestionUser from "../../../components/ContentSecurity/ConfigGestionUser/ConfigGestionUser";
import ConfigHistory from "../../../components/ContentSecurity/ConfigHistory/ConfigHistory";

function Dashboard() {
  return (
    <DashboardContainer>
      <AsideSecurity />
      <RoutesNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.INFOUSER} />} />
        <Route path={PrivateRoutes.INFOUSER} element={<ConfigUser />} />
        <Route path={PrivateRoutes.PROFILE} element={<ConfigPermision />} />
        <Route path={PrivateRoutes.RESOURCE} element={<ConfigResource />} />
        <Route path={PrivateRoutes.USER} element={<ConfigGestionUser />} />
        <Route path={PrivateRoutes.ACTIONHISTORY} element={<ConfigHistory />} />
      </RoutesNotFound>
    </DashboardContainer>
  );
}

export default Dashboard;

const DashboardContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  @media (max-width: 767px) {
    height: 85vh;
  }
`;
