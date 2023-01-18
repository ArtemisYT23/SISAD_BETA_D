import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import GridDocument from "./GridDocument/GridDocument";
import ContainerFile from "./ContainerFile/ContainerFile";
import { setOpenModalMetadataCreated } from "../../../../redux/states/ActionDocumentary";
import MetadataCreated from "./ModalesDocument/MetadataCreated";

const ContainerDocuFile = () => {
  const dispatch = useDispatch();
  const [isTrue, setIsTrue] = useState(false);
  const { cabinetCore, documentary, viewCore, userSesion } = useSelector(
    (store) => store
  );

  const { DocumentFolder } = documentary;
  const { SelectedCabinet } = cabinetCore;
  const { selected, selectedView } = viewCore;
  const { RolSesion, OptionsTocken } = userSesion;

  useEffect(() => {
    OptionsTocken.map((n, i) => {
      if (n.id == "d7b94891-28e4-40e9-9c6a-1878435612ec") {
        setIsTrue(true);
      }
    });
  }, []);

  const OpenModalDocumentCreated = () => {
    dispatch(setOpenModalMetadataCreated(true));
  };

  return (
    <DocumentContainer>
      <ContainerThreeRegister>
        <ContainerCeldaAggDocument>
          {isTrue && (
            <AggButtonDocument onClick={() => OpenModalDocumentCreated()}>
              Nuevo Documento
            </AggButtonDocument>
          )}
          <MetadataCreated />
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
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    height: 100%;
  }
`;

const ContainerThreeRegister = styled.div`
  width: 15%;
  height: 470px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 767px) {
    width: 30%;
    height: 100%;
  }
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
  @media (max-width: 767px) {
    width: 60%;
    height: 100%;
  }
`;
