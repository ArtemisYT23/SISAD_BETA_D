import styled from "styled-components";
import MenuSecurity from "./MenuSecurity/MenuSecurity";
import ActiveMenu from "./ActiveMenu";
import { useSelector } from "react-redux";

const AsideSecurity = () => {
  const { modalCore } = useSelector((store) => store);
  const { isOpenSecurity } = modalCore;
  return (
    <DashboardAsideContainer>
      {isOpenSecurity ? <MenuSecurity /> : <></>}
      <ActiveMenu />
    </DashboardAsideContainer>
  );
};

export default AsideSecurity;

const DashboardAsideContainer = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: -0.5rem 0 1.5rem -0.5rem rgba(0, 0, 0, 0.2);
  display: flex;
  @media (max-width: 767px) {
    height: 0;
  }
`;
