import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenModalDeleteFile,
  setOpenModalUploaderUnirFile,
  setOpenModalUploadFile,
  setOpenModalUploadUpdateFile,
} from "../../../../../../../redux/states/ActionDocumentary";
import { setSelectedFileDocumentary } from "../../../../../../../redux/states/Files";
import { getFileTypeFileDataNewCore } from "../../../../../../../redux/formData/FilesData";
import { setGetNameTypeFileNameDocu } from "../../../../../../../redux/formData/FileData";
import { DeleteIconFile, EditIconFile } from "./Icons";
import FilesCreated from "../FilesCreated";
import FilesUpdate from "../FilesUpdate";
import FilesDelete from "../FilesDelete";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

const useStyless = makeStyles((theme) => ({
  FileUpload: {
    position: "absolute",
    width: "760px",
    "@media (max-width: 767px)": {
      width: "360px",
    },
    height: "500px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    borderRadius: "13px",
    "&::-webkit-scrollbar": {
      display: "0.4em",
    },
    transform: "translate(-50%,-50%)",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const OpenFileNavigator = (props) => {
  const invokeParentMethod = () => {
    window.open(props.node.data.file);
  };

  return <ButtonModal onClick={invokeParentMethod}>Ver</ButtonModal>;
};

const EditFileUploader = (props) => {
  const dispatch = useDispatch();
  const invokeParentMethod = () => {
    dispatch(setOpenModalUploadUpdateFile(true));
    dispatch(setSelectedFileDocumentary(props.node.data.id));
  };

  return <ButtonModal onClick={invokeParentMethod}>Editar</ButtonModal>;
};

const DeleteFileUploader = (props) => {
  const dispatch = useDispatch();
  const invokeParentMethod = () => {
    dispatch(setOpenModalDeleteFile(true));
    dispatch(setSelectedFileDocumentary(props.node.data.id));
  };

  return <ButtonModal onClick={invokeParentMethod}>Eliminar</ButtonModal>;
};

const PreviewFiles = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalDocumentary, typeFileCore, filesCore, cabinetCore } = useSelector(
    (store) => store
  );
  const { FileUpload } = modalDocumentary;
  const { FilesFolders } = typeFileCore;
  const { files, SelectedFile } = filesCore;
  const { SelectedCabinet } = cabinetCore;
  const [input, setInput] = useState({ ids_diets: [] });
  const [cargados, setCargados] = useState(true);
  const [pendiente, setPendientes] = useState(false);
  const [Select, setFiles] = useState([]);

  useEffect(() => {
    const Files = [];
    const idFiless = files.map((ind, i) => Files.push(files[i].fileTypeId));
    setInput({ ...input, ids_diets: Files });
  }, [files]);

  useEffect(() => {
    if (SelectedCabinet?.viewMode == false) {
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
    }
    if (SelectedCabinet?.viewMode == true){
      setFiles(files);
    }
  }, [files]);

  const ChildMessageRendererCheck = (props) => {
    return (
      <input
        type="checkbox"
        checked={input.ids_diets.includes(props.node.data.fileTypeId)}
      />
    );
  };

  const ChildMessageRendererNewFile = (props) => {
    const dispatch = useDispatch();
    const invokeParentMethod = () => {
      FilesFolders.forEach((file, i) => {
        if (file.fileTypeId === props.node.data.fileTypeId) {
          dispatch(setOpenModalUploaderUnirFile(true));
          dispatch(getFileTypeFileDataNewCore(file.fileTypeId)),
            dispatch(setGetNameTypeFileNameDocu(file.fileTypeName));
        }
      });
    };

    return (
      <ButtonNewFile onClick={invokeParentMethod}>Subir Archivo</ButtonNewFile>
    );
  };

  const ActiveCargados = () => {
    setCargados(true);
    setPendientes(false);
  };

  const ActivePendientes = () => {
    setCargados(false);
    setPendientes(true);
  };

  const DataMeta = [
    {
      headerName: "Id",
      field: "sequential",
      filter: true,
      pinned: "left",
      width: 90,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Extension",
      field: "extension",
      filter: true,
      pinned: "left",
      width: 90,
      floatingFilter: true,
      resizable: true,
    },
    {
      headerName: "Tipo Archivo",
      field: "fileTypeName",
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Nombre",
      field: "name",
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Descripcion",
      field: "description",
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Ver",
      field: "id",
      cellRenderer: OpenFileNavigator,
      width: 100,
      filter: false,
      resizable: true,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Editar",
      field: "id",
      cellRenderer: EditFileUploader,
      width: 100,
      filter: false,
      resizable: true,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Eliminar",
      field: "id",
      cellRenderer: DeleteFileUploader,
      width: 100,
      filter: false,
      resizable: true,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
  ];

  const DataFiles = [
    {
      headerName: "CARGADOS",
      field: "fileTypeId",
      cellRenderer: ChildMessageRendererCheck,
      Width: 250,
      filter: false,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "TIPO DE ARCHIVO",
      field: "fileTypeName",
      minWidth: 160,
      filter: true,
      sortable: true,
    },
    {
      headerName: "CARGA DE ARCHIVO",
      field: "fileTypeId",
      cellRenderer: ChildMessageRendererNewFile,
      Width: 250,
      filter: false,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
  ];

  const loadingCellRendererParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  const Uploader = (
    <div className={styless.FileUpload}>
      <div className="headersContainer">
        <button
          className={cargados ? "ButtonChange-on" : "ButtonChange-off"}
          onClick={() => ActiveCargados()}
        >
          Archivos Cargados
        </button>
        <button
          className={pendiente ? "ButtonChange-on" : "ButtonChange-off"}
          onClick={() => ActivePendientes()}
        >
          Archivos Pendientes
        </button>
      </div>

      {cargados && (
        <ContainerTable>
          <div
            id="myGrid"
            style={{ width: "100%", height: "100%" }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              rowData={Select}
              columnDefs={DataMeta}
              animateRows={true}
              rowSelection={"single"}
              loadingCellRendererParams={loadingCellRendererParams}
            ></AgGridReact>
          </div>
        </ContainerTable>
      )}
      {pendiente && (
        <ContainerTable>
          <div
            id="myGrid"
            style={{ width: "100%", height: "100%" }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              rowData={FilesFolders}
              columnDefs={DataFiles}
              animateRows={true}
              rowSelection={"single"}
              loadingCellRendererParams={loadingCellRendererParams}
            ></AgGridReact>
          </div>
        </ContainerTable>
      )}

      {SelectedFile && (
        <FilesUpdate
          id={SelectedFile?.id}
          name={SelectedFile?.name}
          description={SelectedFile?.description}
          file={SelectedFile?.file}
          fileTypeId={SelectedFile?.fileTypeId}
          documentId={SelectedFile?.documentId}
          fileTypeName={SelectedFile?.fileTypeName}
        />
      )}

      {SelectedFile && (
        <FilesDelete
          id={SelectedFile?.id}
          name={SelectedFile?.name}
          documentId={SelectedFile?.documentId}
        />
      )}

      <FilesCreated />
    </div>
  );

  const OpenModalUploaderDocu = () => {
    dispatch(setOpenModalUploadFile(false));
    setCargados(true);
    setPendientes(false);
  };

  return (
    <Modal open={FileUpload} onClose={OpenModalUploaderDocu}>
      {Uploader}
    </Modal>
  );
};

export default PreviewFiles;

const ContainerTable = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonModal = styled.button`
  color: white;
  background-color: var(--primaryColor);
  width: 70px;
  height: 1.5rem;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonNewFile = styled.button`
  color: white;
  background-color: var(--primaryColor);
  width: 100px;
  height: 1.6rem;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
`;
