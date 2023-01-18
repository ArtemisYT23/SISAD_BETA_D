import styled from "styled-components";
import Resource from "./Resourse/Resource";

const ConfigResource = () => {
    return (
        <PanelResourceContainer>
            <Resource />
        </PanelResourceContainer>
    )
}

export default ConfigResource;

const PanelResourceContainer = styled.div`
  padding: 1rem 0 0 0;
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: center;
`;