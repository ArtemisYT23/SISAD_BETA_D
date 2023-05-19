import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalDownloadMasiveUnit } from "../../../../../../redux/states/ActionDocumentary";
import { useEffect, useState, useMemo } from "react";
import {
  getDataIndexId,
  setClearDataDocumentId,
  setClearDataIndexId,
  setClearDataFileTypeId,
  getDataDownloadMetaFiles,
} from "../../../../../../redux/formData/FileData";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

const useStyless = makeStyles((theme) => ({
  modalDownloadIndi: {
    position: "absolute",
    width: "470px",
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

const DownloadIndividual = () => {
  const dispatch = useDispatch();
  const styless = useStyless();

  const {
    modalDocumentary,
    indexCore,
    typeFileCore,
    uploader,
    cabinetCore,
    metaCore,
  } = useSelector((store) => store);

  const { SelectedCabinet } = cabinetCore;
  const { documentIdDown, indexesDown, fileType } = uploader;
  const { modalDownloadUnit } = modalDocumentary;
  const { IndexConfig } = indexCore;
  const { FilesFolders } = typeFileCore;
  const [Index, setIndex] = useState(true);
  const [typefile, setTypefile] = useState(false);
  const [inde, setInde] = useState({ id_ind: [] });
  const [fil, setFil] = useState({ id_fil: [] });
  const [gridApi, setGridApi] = useState({});

  useEffect(() => {
    const Indexes = [];
    const idIndexs = indexesDown.map((ind, i) => Indexes.push(indexesDown[i]));
    setInde({ ...inde, id_ind: Indexes });
    const fileId = [];
    const idFiles = fileType.map((fil, i) => fileId.push(fileType[i]));
    setFil({ ...fil, id_fil: fileId });
  }, [indexesDown, fileType]);

  const ChildMessageCheckIndex = (props) => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
      const checkboxes = document.querySelectorAll(
        'input[name="indexes"]:checked'
      );
      const SelectedIndex = [];
      checkboxes.forEach((checkbox) => {
        SelectedIndex.push(checkbox.value);
      });
      dispatch(getDataIndexId(SelectedIndex));
    };
    return (
      <input
        name="indexes"
        type="checkbox"
        value={props.node.data.id}
        checked={inde.id_ind.includes(props.node.data.id)}
        onChange={handleChange}
      />
    );
  };

  const ChildMessageCheckTypeFile = (props) => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
      const checkboxes = document.querySelectorAll(
        'input[name="filestype"]:checked'
      );
      const SelectedFiles = [];
      checkboxes.forEach((checkbox) => {
        SelectedFiles.push(checkbox.value);
      });
      dispatch(getFileTypeId(SelectedFiles));
    };

    return (
      <input
        name="filestype"
        type="checkbox"
        value={props.node.data.fileTypeId}
        checked={fil.id_fil.includes(props.node.data.fileTypeId)}
        onChange={handleChange}
      />
    );
  };

  const ActiveIndex = () => {
    setIndex(true);
    setTypefile(false);
  };

  const ActiveTypefile = () => {
    setIndex(false);
    setTypefile(true);
  };

  const DataIndex = [
    {
      headerName: "",
      field: "id",
      filter: false,
      cellRenderer: ChildMessageCheckIndex,
      width: 180,
      floatingFilter: true,
      resizable: true,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Nombre",
      field: "name",
      filter: true,
      minWidth: 100,
      floatingFilter: true,
      resizable: true,
    },
  ];

  const DataFiles = [
    {
      headerName: "",
      field: "fileTypeId",
      cellRenderer: ChildMessageCheckTypeFile,
      width: 160,
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
      floatingFilter: true,
      resizable: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const DownData = {
      cabinetId: SelectedCabinet?.id,
      folderId: null,
      documentsId: documentIdDown,
      fileTypesId: fileType,
      indexesId: indexesDown,
    };
    console.log(DownData);
    dispatch(getDataDownloadMetaFiles(DownData, SelectedCabinet?.id));
    OpenModalDownloadMasive();
  };

  const loadingCellRendererParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  const DownLoadFiles = (
    <div className={styless.modalDownloadIndi}>
      <div className="headersContainer">
        <button
          className={Index ? "ButtonChange-on" : "ButtonChange-off"}
          onClick={() => ActiveIndex()}
        >
          Indices
        </button>
        <button
          className={typefile ? "ButtonChange-on" : "ButtonChange-off"}
          onClick={() => ActiveTypefile()}
        >
          Tipo De Archivos
        </button>
        <ButtonDownload
        onClick={(e) => handleSubmit(e)}
        >
          Descargar
        </ButtonDownload>
      </div>

      {Index && (
        <ContainerTable>
          <div
            id="myGrid"
            style={{ width: "100%", height: "100%" }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              rowData={IndexConfig}
              columnDefs={DataIndex}
              animateRows={true}
              rowSelection={"single"}
              loadingCellRendererParams={loadingCellRendererParams}
            ></AgGridReact>
          </div>
        </ContainerTable>
      )}

      {typefile && (
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
    </div>
  );

  const OpenModalDownloadMasive = () => {
    dispatch(setOpenModalDownloadMasiveUnit(false));
    dispatch(setClearDataDocumentId());
    dispatch(setClearDataIndexId());
    dispatch(setClearDataFileTypeId());
    setIndex(true);
    setTypefile(false);
  };

  return (
    <div className={styless.container}>
      <Modal open={modalDownloadUnit} onClose={OpenModalDownloadMasive}>
        {DownLoadFiles}
      </Modal>
    </div>
  );
};

export default DownloadIndividual;

const ContainerTable = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const ButtonDownload = styled.button`
    outline: none;
    margin: 0 0 0 1rem;
    border: none;
    width: 90px;
    background-color: #ee7411;
    color: white;
    cursor: pointer;
`;
