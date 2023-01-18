import styled from "styled-components";
import UserPanel from "./UserPanel/UserPanel";

const ConfigUser = () => {
  return (
    <PanelUserContainer>
      <UserPanel />
    </PanelUserContainer>
  );
};

export default ConfigUser;

const PanelUserContainer = styled.div`
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
  @media (max-width: 767px) {
    height: 800px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
