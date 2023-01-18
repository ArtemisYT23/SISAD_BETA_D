import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import GridFiles from "./GridFiles/GridFiles";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {
  setOpenModalUploadFile,
  setOpenModalMasiveUploader,
} from "../../../../../redux/states/ActionDocumentary";
import GridFilesDefault from "./GridFilesDefault/GridFilesDefault";
import FilesPreview from "./ModalesFile/FilesPreview";
import MasiveUploader from "./ModalesFile/MasiveUpload";
import LoadingSpinner from "../../../../../utilities/LoadingSpinner";
import { DocumentServer } from "../../../../../config/axios";
import toast, { Toaster } from "react-hot-toast";

const ContainerFile = () => {
  const dispatch = useDispatch();
  const [Open, setOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [activeText, setActiveText] = useState("");
  const { filesCore, documentary, userSesion, viewCore, folderCore, sesion, typeFileCore } =
    useSelector((store) => store);
  const { TockenUser } = sesion;
  const { files, isLoadingArchive } = filesCore;
  const { selectedView } = viewCore;
  const { SelectedDocument } = documentary;
  const { SelectedFolder } = folderCore;
  const { FilesFolders } = typeFileCore;
  const { RolSesion, OptionsTocken } = userSesion;
  const [Select, setFiles] = useState([]);

  const OpenSearchFiles = () => {
    setOpen(!Open);
  };

  const OpenModalFileUploader = () => {
    dispatch(setOpenModalUploadFile(true));
  };

  const OpenModalUploadMasive = () => {
    dispatch(setOpenModalMasiveUploader(true));
  };

  useEffect(() => {
    OptionsTocken.map((n, i) => {
      if (n.id == "eefbe386-434e-4f00-95be-22d3e0b38b9b") {
        setIsTrue(true);
      }
    });
  }, []);

  useEffect(() => {
    const FileEnablig = [];
    files.map((file, i) => {
      FilesFolders.map((type, i) => {
        if (file.fileTypeId == type.fileTypeId) {
          FileEnablig.push(file);
        }
      });
    });
    setFiles(FileEnablig);
  }, [files]);

  function searchingTerm(term) {
    return function (x) {
      return x.name.toLowerCase().includes(term) || !term;
    };
  }

  const downloadExcel = (folderId) => {
    toast.loading("Descargando Archivo");
    axios({
      url: `${DocumentServer}exportalltoexcel/${folderId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${TockenUser}`,
      },
    })
      .then(function (response) {
        const res = response.data;
        // console.log(response);
        const url =
          "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
          res;
        saveAsExcelFile(url, "Metadata");
        toast.success("Reporte Descargado");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveAsExcelFile = (url, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        const data = url;
        module.default.saveAs(data, fileName + "_export_" + new Date());
      }
    });
  };

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

        {SelectedDocument != "" && (
          <Button
            type="button"
            icon="pi pi-plus"
            className="p-button-rounded p-button-success"
            title="AGREGAR"
            onClick={() => OpenModalFileUploader()}
          />
        )}

        <SpaceLine />
        <SpaceLine />
        {SelectedFolder != "" && isTrue ? (
          <Button
            type="button"
            icon="pi pi-upload"
            className="p-button-rounded p-button-alert"
            title="SUBIR MASIVAMENTE"
            onClick={() => OpenModalUploadMasive()}
          />
        ) : (
          <></>
        )}

        <SpaceLine />
        <SpaceLine />

        <Button
          type="button"
          icon="pi pi-file-excel"
          className="p-button-rounded p-button-success"
          title="EXPORTAR METADATA"
          onClick={() => downloadExcel(SelectedFolder?.id)}
        />

        <FilesPreview />
        <MasiveUploader />
      </ContainerSearchFiles>
      <DocumentContainer>
        {isLoadingArchive ? (
          <LoadingSpinner />
        ) : (
          <>
            {selectedView != "list" ? (
              Select
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
  margin: 0 0.5rem 0 0.8rem;
  outline: none;
`;

const SpaceLine = styled.div`
  margin: 0 0.5rem 0 0;
`;
