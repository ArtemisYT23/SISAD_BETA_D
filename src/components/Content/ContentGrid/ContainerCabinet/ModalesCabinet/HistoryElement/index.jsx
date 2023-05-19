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
import { setOpenModalHistoryViewElement } from "../../../../../../redux/states/ActionCore";
import {
  clearResourceDataCore,
  clearResourseDataDocumental,
} from "../../../../../../redux/states/History";

const useStyless = makeStyles(() => ({
  HistoryElementView: {
    position: "absolute",
    width: "700px",
    "@media (max-width: 767px)": {
      width: "360px",
    },
    height: "490px",
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    overflow: "scroll",
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

const HistoryElement = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalCore, historyCore } = useSelector((store) => store);
  const { HistoryElementView } = modalCore;
  const { historyResource, isLoadingHistoryUser } = historyCore;
  const [gridApi, setGridApi] = useState({});

  const DataHistory = [
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
      headerName: "Nombre Recurso",
      field: "resourceName",
      filter: true,
      minWidth: 250,
    },
    {
      headerName: "Usuario",
      field: "userName",
      filter: true,
      minWidth: 250,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Accion",
      field: "optionName",
      filter: true,
      minWidth: 250,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Fecha",
      field: "dateOcurred",
      filter: true,
      minWidth: 250,
    },
    {
      headerName: "Ruta",
      field: "path",
      filter: true,
      minWidth: 550,
    },
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

  const HistoryContent = (
    <div className={styless.HistoryElementView}>
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
            rowData={historyResource}
            columnDefs={DataHistory}
            defaultColDef={defaultColDef}
            animateRows={true}
          ></AgGridReact>
        </div>
      </ContentTable>
    </div>
  );

  const OpenModalHistoryElementView = () => {
    dispatch(setOpenModalHistoryViewElement(false));
    dispatch(clearResourceDataCore());
    dispatch(clearResourseDataDocumental());
  };

  return (
    <div className={styless.container}>
      <Modal open={HistoryElementView} onClose={OpenModalHistoryElementView}>
        {HistoryContent}
      </Modal>
    </div>
  );
};

export default HistoryElement;

const ContentTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
