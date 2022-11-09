import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GridFiles from "./GridFiles/GridFiles";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { setOpenModalUploadFile } from "../../../../../redux/states/ActionDocumentary";
import GridFilesDefault from "./GridFilesDefault/GridFilesDefault";
// import FileUploaderCreated from "./ModalesFile/FileUploaderCreated";
import LoadingSpinner from "../../../../../utilities/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";

const ContainerFile = () => {
  const dispatch = useDispatch();
  const [Open, setOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(true);
  const [activeText, setActiveText] = useState("");
  const { filesCore, documentary, userSesion, viewCore } = useSelector(
    (store) => store
  );
  const { files, isLoadingArchive } = filesCore;
  const { selectedView } = viewCore;
  const { SelectedDocument } = documentary;
  const { RolSesion } = userSesion;

  const OpenSearchFiles = () => {
    setOpen(!Open);
  };

  const OpenModalFileUploader = () => {
    dispatch(setOpenModalUploadFile(true));
  };

  useEffect(() => {
    if (RolSesion[2] == "Administrator") {
      setIsTrue(false);
    }
    if (RolSesion[2] == "Writer") {
      setIsTrue(false);
    }
  }, [RolSesion]);

  function searchingTerm(term) {
    return function (x) {
      return x.name.toLowerCase().includes(term) || !term;
    };
  }

  return (
    <>
      <ContainerSearchFiles>
        <SpaceLine />
        <SpaceLine />
        <SpaceLine />

        <Button
          type="button"
          icon="pi pi-search"
          className="p-button-rounded p-button-warning"
          title="BUSCAR"
          onClick={() => OpenSearchFiles()}
        />

        <SpaceLine />

        {Open && (
          <InputSearch
            type="text"
            placeholder="Buscar Archivo"
            onChange={(e) => {
              setActiveText(e.target.value);
            }}
          />
        )}

        <SpaceLine />

        {SelectedDocument && (
          <Button
            type="button"
            icon="pi pi-plus"
            className="p-button-rounded p-button-success"
            title="AGREGAR"
            disabled={isTrue}
            onClick={() => OpenModalFileUploader()}
          />
        )}

        {/* <FileUploaderCreated /> */}
      </ContainerSearchFiles>
      <DocumentContainer>
        {isLoadingArchive ? (
          <LoadingSpinner />
        ) : (
          <>
            {selectedView != "list" ? (
              files
                .filter(searchingTerm(activeText))
                .map(
                  (
                    {
                      id,
                      extension,
                      name,
                      description,
                      fileTypeId,
                      documentId,
                      file,
                      fileTypeName,
                    },
                    index
                  ) => (
                    <GridFiles
                      key={index}
                      id={id}
                      extension={extension}
                      fileTypeId={fileTypeId}
                      documentId={documentId}
                      name={name}
                      description={description}
                      file={file}
                      fileTypeName={fileTypeName}
                      element="archivos"
                    />
                  )
                )
            ) : (
              <></>
            )}
          </>
        )}

        {files == "" ? <GridFilesDefault /> : <></>}

        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "",
            duration: 3500,
            style: {
              background: "#F68A20",
              color: "#fff",
            },
          }}
        />
      </DocumentContainer>
    </>
  );
};

export default ContainerFile;

const DocumentContainer = styled.div`
  padding-bottom: 2rem; 
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 420px;
  width: 100%;
`;

const ContainerSearchFiles = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
`;

const InputSearch = styled.input`
  width: 250px;
  height: 2rem;
  margin: 0 .5rem 0 .8rem;
  outline: none;
`;

const SpaceLine = styled.div`
  margin: 0 0.5rem 0 0;
`;
