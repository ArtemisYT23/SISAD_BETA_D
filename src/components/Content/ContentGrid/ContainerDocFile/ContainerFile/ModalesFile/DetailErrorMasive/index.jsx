import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalMasiveErrorUploader } from "../../../../../../../redux/states/ActionDocumentary";

const useStyless = makeStyles(() => ({
  DetailErrorMetadata: {
    position: "absolute",
    width: "850px",
    "@media (max-width: 767px)": {
      width: "360px",
    },
    height: "490px",
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    overflow: "hidden",
    borderRadius: "13px",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const DetailErrorMasive = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalDocumentary, uploader } = useSelector((store) => store);
  const { ModalErrorMasive } = modalDocumentary;
  const { FilesStateDetail } = uploader;
  const [gridApi, setGridApi] = useState({});

  const DataError = [
    {
      headerName: "Tipo De Recurso",
      field: "resourceType",
      filter: true,
      minWidth: 250,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Valor de Metadata",
      field: "resourceValue",
      filter: true,
      minWidth: 250,
    },
    {
      headerName: "Excel localizacion",
      field: "excelLocation",
      filter: true,
      minWidth: 150,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Tipo de Verificacion",
      field: "verificationType",
      filter: true,
      minWidth: 250,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Error",
      field: "errorMessage",
      filter: true,
      minWidth: 350,
    }
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
      minWidth: 140,
      filter: true,
      resizable: true,
      floatingFilter: true,
    };
  }, []);

  const pagination = true;
  const paginationPageSize = 300;



  const DetailMetadataError = (
 <div className={styless.DetailErrorMetadata}>
      <ContentTable>
        <div
          id="myGrid"
          style={{ width: "100%", height: "100%" }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            onGridReady={onGridReady}
            rowData={FilesStateDetail}
            columnDefs={DataError}
            defaultColDef={defaultColDef}
            animateRows={true}
          ></AgGridReact>
        </div>
      </ContentTable>
    </div>
  );

  const OpenModalErrorDetailMetadata = () => {
    dispatch(setOpenModalMasiveErrorUploader(false));
  }

  return (
    <div className={styless.container}>
      <Modal open={ModalErrorMasive} onClose={OpenModalErrorDetailMetadata}>
        {DetailMetadataError}
      </Modal>
    </div>
  );

};

export default DetailErrorMasive;

const ContentTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;