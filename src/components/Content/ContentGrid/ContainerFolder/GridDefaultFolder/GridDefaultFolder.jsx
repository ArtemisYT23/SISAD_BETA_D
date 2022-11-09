import styled from "styled-components";
import { ElementDefaultFolders } from "./Icons";

const GridDefaultFolder = () => {
  return (
    <ContainerDefault>
      <ContainerContent>
        <ElementDefaultFolders x={150} y={150} />
        <Title>Sin Carpetas Existentes</Title>
      </ContainerContent>
    </ContainerDefault>
  );
};

export default GridDefaultFolder;

const ContainerDefault = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2rem;
    justify-content: center;
    text-align: center;
    color: var(--lineColor);    
`;