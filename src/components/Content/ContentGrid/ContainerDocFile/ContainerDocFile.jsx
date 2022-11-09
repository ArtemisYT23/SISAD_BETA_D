import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import GridDocument from "./GridDocument/GridDocument";
import ContainerFile from "./ContainerFile/ContainerFile";
import { setOpenModalDocumentCreated } from "../../../../redux/states/ActionDocumentary";

const ContainerDocuFile = () => {
  const dispatch = useDispatch();
  const [isTrue, setIsTrue] = useState(true);
  const { folderCore, cabinetCore, documentary, viewCore, userSesion } =
    useSelector((store) => store);

  const { DocumentFolder } = documentary;
  const { SelectedCabinet } = cabinetCore;
  const { SelectedFolder } = folderCore;
  const { selected, selectedView } = viewCore;
  const { RolSesion } = userSesion;

  useEffect(() => {
    if (RolSesion[2] == "Administrator") {
      setIsTrue(false);
    }
    if (RolSesion[2] == "Writer") {
      setIsTrue(false);
    }
  }, [RolSesion]);

  const OpenModalDocumentCreated = () => {
    dispatch(setOpenModalDocumentCreated(true));
  };

  return (
    <DocumentContainer>
      <ContainerThreeRegister>
        <ContainerCeldaAggDocument>
          <AggButtonDocument
            disabled={isTrue}
            onClick={() => OpenModalDocumentCreated()}
          >
            Nuevo Documento
          </AggButtonDocument>
          {/* <DocumentCreated /> */}
        </ContainerCeldaAggDocument>
        <br />
        {selected === "folder" && selectedView === "grid" ? (
          DocumentFolder.map(({ id, folderId, sequentialId }, index) => (
            <GridDocument
              key={index}
              id={id}
              folderId={folderId}
              sequentialId={sequentialId}
              element="document"
              cabinetId={SelectedCabinet?.id}
            />
          ))
        ) : (
          <></>
        )}
      </ContainerThreeRegister>
  
      <ContainerFilesSection>
        <ContainerFile />
      </ContainerFilesSection>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />
    </DocumentContainer>
  );
};

export default ContainerDocuFile;

const DocumentContainer = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const ContainerThreeRegister = styled.div`
  width: 15%;
  height: 470px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const ContainerCeldaAggDocument = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

const AggButtonDocument = styled.button`
  width: 100%;
  height: 2.2rem;
  background-color: #f68a20;
  text-align: center;
  font-size: 0.8rem;
  border: 1px solid #f68a20;
  color: #fff;
  cursor: pointer;

  &:disabled {
    color: white;
    background-color: #f4993eb3;
  }
`;

const ContainerFilesSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
`;
