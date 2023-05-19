import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getFileAllDocument,
  setFilterFileTypeByDocument,
} from "../../../../../redux/states/Files";
import {
  setSelectedDocumentDocu,
  cleanerSelectedDocument,
} from "../../../../../redux/states/Document";
import { setSelectedSearchMetadataCore } from "../../../../../redux/states/View";
import { setOpenDetalleModal } from "../../../../../redux/states/ActionDocumentary";
import {
  getDataDocumentId,
  getFileTypeId,
  getDataDownloadMetaFiles,
  setClearDataDocumentId,
  setClearDataIndexId,
  setClearDataFileTypeId,
} from "../../../../../redux/formData/FileData";
import GridFiles from "../ContainerFile/GridFiles/GridFiles";
import GridFilesDefault from "../ContainerFile/GridFilesDefault/GridFilesDefault";
import LoadingSpinner from "../../../../../utilities/LoadingSpinner";
import { Tooltip } from "@material-ui/core";
import DownloadIndividual from "../ModalesDocument/DownloadIndividual";
import { MultiSelect } from "primereact/multiselect";

const GridDocument = ({ index, documentId, folderId, cabinetId, values }) => {
  const dispatch = useDispatch();
  const {
    filesCore,
    documentary,
    userSesion,
    viewCore,
    folderCore,
    sesion,
    typeFileCore,
    modalDocumentary,
    cabinetCore,
    uploader,
    indexCore,
  } = useSelector((store) => store);
  const { IndexConfig } = indexCore;
  const { documentIdDown, indexesDown, fileType } = uploader;
  const { files, isLoadingArchive } = filesCore;
  const { selectedView } = viewCore;
  const { SelectedDocument } = documentary;
  const { SelectedFolder } = folderCore;
  const { SelectedCabinet } = cabinetCore;
  const { FilesFolders } = typeFileCore;
  const { RolSesion, OptionsTocken } = userSesion;
  const { modalPreview } = modalDocumentary;

  const [Select, setFiles] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeText, setActiveText] = useState();

  useEffect(() => {
    OptionsTocken.map((n, i) => {
      if (n.id == "eefbe386-434e-4f00-95be-22d3e0b38b9b") {
        setIsTrue(true);
      }
    });
  }, []);

  useEffect(() => {
    // console.log(FilesFolders);
    const FileEnablig = [];
    files.map((file, i) => {
      FilesFolders.forEach((fol, i) => {
        if (file.fileTypeId == fol.fileTypeId) {
          FileEnablig.push(file);
        }
      });
    });
    // console.log(FileEnablig);
    setFiles(FileEnablig);
  }, [files]);

  const DocumentEnter = (id) => {
    dispatch(getFileAllDocument(id));
    dispatch(setSelectedDocumentDocu(id));
    dispatch(setSelectedSearchMetadataCore());
    dispatch(setOpenDetalleModal(false));
    const docuId = [];
    if (docuId != "") {
      docuId.forEach((doc, i) => {
        if (doc == id) {
        }
      });
    }
    docuId.push(id);
    dispatch(getDataDocumentId(docuId));

    const fileType = [];
    FilesFolders.forEach((fil, i) => {
      fileType.push(fil.fileTypeId);
    });
    dispatch(getFileTypeId(fileType));
  };

  const DeleteSelectedDocument = () => {
    dispatch(cleanerSelectedDocument());
    dispatch(setClearDataDocumentId());
    dispatch(setClearDataIndexId());
    dispatch(setClearDataFileTypeId());
  };

  function searchingTerm(term) {
    return function (x) {
      return x.fileTypeId.includes(term) || !term;
    };
  }

  const ChangeFileType = (fileId) => {
    searchingTerm(fileId);
  };

  const masiveDownload = (fileType) => {
    const fileTypId = [];

    if (fileType == "") {
      FilesFolders.forEach((fil, i) => {
        fileTypId.push(fil.fileTypId);
      });
    }

    if (fileTypId != null) {
      fileTypId.forEach((fil, i) => {
        if (fil == fileType) {
        }
      });
    }

    if (fileType != "") {
      fileTypId.push(fileType);
    }
    dispatch(getFileTypeId(fileTypId));
  };

  const SelectedIndex = (e) => {
    setSelectedCity(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const indexes = [];
    if (selectedCity != null) {
      selectedCity?.forEach((ind, i) => {
        indexes.push(ind.id);
      });
    }

    const DownData = {
      cabinetId: SelectedCabinet?.id,
      folderId: null,
      documentsId: documentIdDown,
      fileTypesId: fileType,
      indexesId: indexes,
    };
    console.log(DownData);
    dispatch(getDataDownloadMetaFiles(DownData, SelectedCabinet?.id));
  };

  return (
    <>
      <DownloadIndividual />
      <ContainerCeldaRegister>
        <MetadataCelda>
          <Content>{index}</Content>
          {values ? (
            values.map((value, index) => (
              <>
                <Tooltip key={index} title={value}>
                  <ContentCelda>
                    {value.slice(0, 8) == "https://" && <ImgContent src={value} alt="sin foto" />}
                    {value.slice(0, 8) != "https://" && <p>{value}</p>}
                  </ContentCelda>
                </Tooltip>
              </>
            ))
          ) : (
            <>... cargando</>
          )}
          {modalPreview != true && (
            <>
              <Action onClick={() => DocumentEnter(documentId)}>
                Abrir Archivos
              </Action>

              {SelectedDocument?.id == documentId && (
                <>
                  <Cancel onClick={() => DeleteSelectedDocument()}>X</Cancel>
                </>
              )}
            </>
          )}
        </MetadataCelda>

        {modalPreview != false && (
          <MetadataCelda>
            <Action onClick={() => DocumentEnter(documentId)}>
              Abrir Archivos
            </Action>

            {SelectedDocument?.id == documentId && (
              <>
                <Cancel onClick={() => DeleteSelectedDocument()}>X</Cancel>
              </>
            )}
          </MetadataCelda>
        )}

        {SelectedDocument?.id == documentId && (
          <>
            <MetadataCelda>
              <Selected
                onChange={(e) => {
                  ChangeFileType(e.target.value), setActiveText(e.target.value);
                  masiveDownload(e.target.value, documentId);
                }}
              >
                <option hidden>TIPO DE ARCHIVO</option>
                <option value="">Todos</option>
                {FilesFolders ? (
                  FilesFolders.map((file, i) => (
                    <option value={file.fileTypeId}>{file.fileTypeName}</option>
                  ))
                ) : (
                  <></>
                )}
              </Selected>

              <MultiSelect
                value={selectedCity}
                options={IndexConfig}
                onChange={(e) => SelectedIndex(e.value)}
                optionLabel="name"
                style={{
                  width: "250px",
                  height: "40px",
                  margin: "0 0 0 .5rem",
                  textAlign: "center",
                  border: "1px solid var(--primaryColor)",
                }}
                placeholder="Seleccione un indice"
              />

              <ActionDownload onClick={(e) => handleSubmit(e)}>
                Descargar Archivos
              </ActionDownload>
            </MetadataCelda>
            <ContainerFiles>
              {isLoadingArchive ? (
                <LoadingSpinner />
              ) : (
                <>
                  {selectedView != "list" ? (
                    Select.filter(searchingTerm(activeText)).map(
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
            </ContainerFiles>
          </>
        )}
      </ContainerCeldaRegister>
    </>
  );
};

export default GridDocument;

const ContainerCeldaRegister = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MetadataCelda = styled.div`
  width: 99%;
  height: 40px;
  display: flex;
  align-items: center;
  /* color: #f68a20; */
  color: #c4c4c4;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  /* border: 1px solid #f68a20; */
  border: 1px solid #c4c4c4;

  span {
    margin: 0 1rem 0 1rem;
  }
`;

const Content = styled.div`
  width: 70px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ContentCelda = styled.div`
  width: 220px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  /* border: 1px solid #f68a20; */

  p {
    width: 220px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const ContainerFiles = styled.div`
  width: 99%;
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
  border: 1px solid #c4c4c4;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Action = styled.button`
  width: 10%;
  height: 75%;
  line-height: 2;
  margin: 0 0.5rem 0 0.5rem;
  border-radius: 13px;
  border: none;
  background-color: var(--primaryColor);
  color: #fff;
  cursor: pointer;
`;

const ActionDownload = styled.button`
  width: 20%;
  height: 75%;
  line-height: 2;
  margin: 0 0.5rem 0 0.5rem;
  border-radius: 13px;
  border: none;
  background-color: var(--primaryColor);
  color: #fff;
  cursor: pointer;
`;

const Cancel = styled.button`
  width: 30px;
  height: 30px;
  line-height: 2;
  margin: 0 0.5rem 0 0.5rem;
  border-radius: 100%;
  border: 1px solid var(--primaryColor);
  background-color: #fff;
  color: var(--primaryColor);
  font-weight: bold;
  cursor: pointer;
`;

export const Selected = styled.select`
  width: 350px;
  height: 2rem;
  text-align: center;
  color: var(--primaryColor);
  border: 1px solid var(--primaryColor);
  outline: none;
  border-radius: 10px;
`;

const ImgContent = styled.img`
  width: 40px;
  height: 40px;
`;