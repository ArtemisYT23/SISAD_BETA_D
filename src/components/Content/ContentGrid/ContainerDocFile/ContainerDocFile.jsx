import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "primereact/button";
import GridDocument from "./GridDocument/GridDocument";
import {
  setOpenModalMetadataCreated,
  setOpenModalUploadFile,
  setOpenModalMasiveUploader,
  setOpenModalDownloadMasiveUnit,
  setOpenModalSearchFiles,
  setOpenModalDownloadMasive,
} from "../../../../redux/states/ActionDocumentary";
import {
  getMetadataByCabinet,
  getMetadataByCabinetFilter,
} from "../../../../redux/states/Metadata";
import { setCountFileTypeByDocument } from "../../../../redux/states/FileType";
import { DocumentServer } from "../../../../config/axios";
import Pagination from "../../../../utilities/Pagination";
import MetadataCreated from "./ModalesDocument/MetadataCreated";
import MasiveUploader from "./ContainerFile/ModalesFile/MasiveUpload";
import FilesPreview from "./ContainerFile/ModalesFile/FilesPreview/FilePreview";
import DownLoadMasive from "./ModalesDocument/DownloadMasive/DownloadMasive";
import SearchFiles from "./ModalesDocument/SearchFiles";
import ModalDownload from "../../../../utilities/ModalDownload";
import DetailErrorMasive from "./ContainerFile/ModalesFile/DetailErrorMasive";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import axios from "axios";

const ContainerDocuFile = () => {
  const dispatch = useDispatch();
  const {
    cabinetCore,
    documentary,
    viewCore,
    userSesion,
    metaCore,
    folderCore,
    sesion,
  } = useSelector((store) => store);
  const { TockenUser } = sesion;
  const { MetadataCabinet, isLoadingMetadata } = metaCore;
  const { DocumentFolder, SelectedDocument } = documentary;
  const { SelectedCabinet } = cabinetCore;
  const { selected, selectedView } = viewCore;
  const { RolSesion, OptionsTocken } = userSesion;
  const { SelectedFolder, SelectedFolderMeta } = folderCore;
  const [isTrue, setIsTrue] = useState(false);
  const [isTrueMasive, setIsTrueMasive] = useState(false);
  const [activeText, setActiveText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(500);

  useEffect(() => {
    OptionsTocken.map((n, i) => {
      if (n.id == "d7b94891-28e4-40e9-9c6a-1878435612ec") {
        setIsTrue(true);
      }
    });

    OptionsTocken.map((n, i) => {
      if (n.id == "eefbe386-434e-4f00-95be-22d3e0b38b9b") {
        setIsTrueMasive(true);
      }
    });
  }, []);

  const OpenModalDocumentCreated = () => {
    dispatch(setOpenModalMetadataCreated(true));
  };

  const OpenSearchFiles = () => {
    dispatch(setOpenModalSearchFiles(true));
  };

  const OpenModalFileUploader = () => {
    dispatch(setOpenModalUploadFile(true));
  };

  const OpenModalUploadMasive = () => {
    dispatch(setOpenModalMasiveUploader(true));
  };

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = MetadataCabinet.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <DocumentContainer>
      <ContainerThreeRegister>
        <ContainerCeldaAggDocument>
          {isTrue && (
            <AggButtonDocument onClick={() => OpenModalDocumentCreated()}>
              Nuevo Documento
            </AggButtonDocument>
          )}
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
          {SelectedFolder != "" && isTrueMasive ? (
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

          <SpaceLine />
          <SpaceLine />

          <Button
            type="button"
            icon="pi pi-download"
            className="p-button-rounded p-button-info"
            title="DESCARGA MASIVA"
            onClick={() => dispatch(setOpenModalDownloadMasive(true))}
          />

          <SpaceLine />
          <SpaceLine />
          <SpaceLine />

          {/* <Selected onChange={(e) => PaginateMetadata(e.target.value)}>
            <option hidden>100</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={5000}>5000</option>
            <option value={20000}>Todos</option>
          </Selected> */}
        </ContainerCeldaAggDocument>
      </ContainerThreeRegister>

      {isLoadingMetadata ? (
        <ContainerFilesSection>
          <LoadingSpinner />
        </ContainerFilesSection>
      ) : (
        <ContainerFilesSection>
          <br />
          <br />
          {selected === "folder" && selectedView === "grid" ? (
            currentPosts?.map(
              ({ folderId, documentId, values, documentSequential }, index) => (
                <GridDocument
                  key={index}
                  index={documentSequential}
                  documentId={documentId}
                  folderId={folderId}
                  values={values}
                  cabinetId={SelectedCabinet?.id}
                />
              )
            )
          ) : (
            <></>
          )}
        </ContainerFilesSection>
      )}

      <Container>
        {" "}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={MetadataCabinet.length}
          paginate={paginate}
        />
      </Container>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />

      <MetadataCreated />
      <FilesPreview />
      <MasiveUploader />
      <SearchFiles />
      <DownLoadMasive />
      <ModalDownload />
      <DetailErrorMasive />
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
  width: 99%;
  height: 55px;
  /* background-color: red; */
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    width: 30%;
    height: 100%;
  }
`;

const ContainerCeldaAggDocument = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AggButtonDocument = styled.button`
  width: 130px;
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
  width: 1050px;
  height: 400px;
  overflow: scroll;

  @media (max-width: 767px) {
    width: 60%;
    height: 100%;
  }
`;

const SpaceLine = styled.div`
  margin: 0 0.5rem 0 0;
`;

const InputSearch = styled.input`
  width: 250px;
  height: 2rem;
  margin: 0 0.5rem 0 0.8rem;
  outline: none;
`;

const Selected = styled.select`
  outline: none;
  border: 1px solid #f68a20;
  width: 80px;
  height: 40px;
  text-align: center;
  color: #f68a20;
  border-radius: 13px;
`;
