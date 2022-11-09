import styled from "styled-components";

import { ElementDefaultDocuments } from "./Icons";

const GridFilesDefault = () => {
  return (
    <ContainerDefault>
      <ElementDefaultDocuments />
      <Title>Sin Archivos Cargados</Title>
    </ContainerDefault>
  );
};

export default GridFilesDefault;

export const ContainerDefault = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  justify-content: center;
  text-align: center;
  color: var(--lineColor);
`;
