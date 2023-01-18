import styled from "styled-components";
import PermisionContent from "./PermisionContent/PermisionContent";

const ConfigPermision = () => {
    return (
    <PanelConfigPermis>
        <PermisionContent />
    </PanelConfigPermis>
 );
}
 
export default ConfigPermision;

const PanelConfigPermis = styled.div`
  padding: 1rem 0 0 0;
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: center;
`;