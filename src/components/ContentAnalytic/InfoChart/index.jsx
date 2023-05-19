import styled from "styled-components";
import { useSelector } from "react-redux";

export const InfoChart = () => {
  const { analitycInfo, cabinetCore, folderCore } = useSelector(
    (store) => store
  );
  const { Documents, Files } = analitycInfo;
  const { cabinets } = cabinetCore;
  const { folders } = folderCore;
  return (
    <>
      <HeaderContainer>
        <Box>
          <h1>Gabinetes</h1>
          <p>{cabinets.length}</p>
        </Box>
        <Box>
          <h1>Carpetas</h1>
          <p>{folders.length}</p>
        </Box>
        {Documents && (
          <>
            <Box>
              <h1>Documentos</h1>
              <p>{Documents.length}</p>
            </Box>
            <Box>
              <h1>Archivos</h1>
              <p>{Files.length}</p>
            </Box>
          </>
        )}
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid var(--lineColor); */
`;

const Box = styled.div`
  width: 200px;
  height: 69%;
  background-color: #ac99cf;
  border-radius: 13px;
  margin: 0 7rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;

  p {
    font-size: 30px;
    margin: 0.8rem 0 1rem 0;
  }

  h1{
    font-size: 24px;
  }
`;