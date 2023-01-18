import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import throttle from "lodash.throttle";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalMasiveUploader } from "../../../../../../../redux/states/ActionDocumentary";
import {
  setFolderMasiveSelected,
  setFileExcelTemplate,
  setFileZipTemplate,
  createdSubmitFileMasive,
  clearDataSubmitMasive,
} from "../../../../../../../redux/formData/FileData";
import {
  TitleModal,
  TitleArchive,
  SaveButton,
  CancelButton,
} from "../../../../../../../Styles/ModalesStyles/modalStyle";
import LoadingSpinner from "../../../../../../../utilities/LoadingSpinner";
import { DocumentServer } from "../../../../../../../config/axios";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const useStyless = makeStyles((theme) => ({
  modalMasive: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  textfield: {
    width: "100%",
    height: "1.5rem",
  },
  container: {
    textAlign: "center",
  },
}));

const MasiveUploader = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalDocumentary, folderCore, sesion, uploader, cabinetCore } =
    useSelector((store) => store);
  const { SelectedFolder } = folderCore;
  const { SelectedCabinet } = cabinetCore;
  const { FolderId, isLoadingMasive } = uploader;
  const { modalMasive } = modalDocumentary;
  const { TockenUser } = sesion;
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (modalMasive != false) {
      dispatch(setFolderMasiveSelected(SelectedFolder?.id));
    }
  }, [modalMasive]);

  const onZipUpdate = (metadata) => {
    setProgress(metadata.percent);
  };

  const throttledZipUpdate = throttle(onZipUpdate, 50);

  const onZip = () => {
    const zip = new JSZip();
    const files = Array.from(inputRef.current.files);

    files.forEach((file) => {
      zip.file(file.webkitRelativePath, file);
    });
    zip
      .generateAsync({ type: "blob" }, throttledZipUpdate)
      .then(function (content) {
        console.log(content);
        dispatch(setFileZipTemplate(content));
        // const formData = new FormData();
        // formData.append("folderzip", content);
        // console.log("ready to send to server", content);
      })
      .catch((e) => console.log(e));
  };

  const setFile = (e) => {
    onZip();
  };

  const setFileExcel = (e) => {
    const file = e.target.files[0];
    dispatch(setFileExcelTemplate(file));
  };

  const DownloadPlantilla = (e, folderSelected) => {
    e.preventDefault();
    toast.loading("Descargando Archivo");
    axios({
      url: `${DocumentServer}downloadtemplate/${folderSelected}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${TockenUser?.token}`,
      },
    })
      .then(function (response) {
        const res = response.data;
        const url =
          "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
          res;
        saveAsExcelFile(url, "Metadata Plantilla");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formFile = new FormData();
    uploader.FolderId && formFile.append("FolderId", uploader.FolderId);
    uploader.ExcelTemplate &&
      formFile.append("ExcelTemplate", uploader.ExcelTemplate);
    uploader.FilesZIP && formFile.append("FilesZIP", uploader.FilesZIP);
    console.log(SelectedCabinet?.id);
    dispatch(createdSubmitFileMasive(formFile, FolderId, SelectedCabinet?.id));
    abrirCerrarModal();
  };

  const abrirCerrarModal = () => {
    dispatch(setOpenModalMasiveUploader(false));
    dispatch(clearDataSubmitMasive());
    setProgress(0);
  };

  return (
    <div className={styless.container}>
      <Modal open={modalMasive} onClose={abrirCerrarModal}>
        {isLoadingMasive ? (
          <LoadingSpinner />
        ) : (
          <div className={styless.modalMasive}>
            <form onSubmit={handleSubmit}>
              <div align="center">
                <TitleModal>Subida Masiva De Registros</TitleModal>
              </div>
              <br />
              <br />
              <TitleArchive>Archivo Excel: </TitleArchive>
              <Space />
              <TitleArchive>Plantilla: </TitleArchive>
              <DownLoad
                onClick={(e) => DownloadPlantilla(e, SelectedFolder?.id)}
              >
                Descargar{" "}
              </DownLoad>
              <br />
              <br />
              <ContainerFiles>
                <input
                  type="file"
                  accept=".xlsx, .xlsm, .xltx, xlsb"
                  onInput={(e) => setFileExcel(e)}
                />
              </ContainerFiles>
              <br />
              <br />

              <TitleArchive>Seleccione Carpeta De Archivos: </TitleArchive>
              <br />
              <br />
              <progress
                className={styless.textfield}
                max="100"
                value={progress}
              >
                {progress?.toFixed(2)}%{" "}
              </progress>
              <span>{progress}%</span>
              <br />
              <br />
              <ContainerFiles>
                <input
                  ref={inputRef}
                  type="file"
                  webkitdirectory="true"
                  onInput={(e) => setFile(e)}
                />
              </ContainerFiles>
              <br />

              <div align="right">
                <SaveButton>Crear</SaveButton>
                <CancelButton onClick={() => abrirCerrarModal()}>
                  Cancelar
                </CancelButton>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MasiveUploader;

const ContainerFiles = styled.div`
  border: 1px solid var(--primaryColor);
  padding: 1rem;
`;

const DownLoad = styled.button`
  border: none;
  background-color: var(--primaryColor);
  color: var(--white);
  padding: 0.3rem;
  width: 100px;
  cursor: pointer;
`;

const Space = styled.span`
  margin: 0 4rem 0 0;
`;
