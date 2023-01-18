import styled from "styled-components";
import SecurityUser from "./SecurityUser/SecurityUser";

const ConfigGestionUser = () => {
  return (
    <PanelSecurityContainer>
      <SecurityUser />
    </PanelSecurityContainer>
  );
};

export default ConfigGestionUser;

const PanelSecurityContainer = styled.div`
  padding: 1rem 0 0 0;
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: center;
`;
