import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    height: "500px",
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
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [filters, setFilters] = useState({
    resourceType: { value: "", matchMode: "contains" },
    resourceName: { value: "", matchMode: "contains" },
    optionName: { value: "", matchMode: "contains" },
    userName: { value: "", matchMode: "contains" },
    dateOcurred: { value: "", matchMode: "contains" },
  });
  const { modalCore, historyCore } = useSelector((store) => store);
  const { HistoryElementView } = modalCore;
  const { historyResource, isLoadingHistoryUser } = historyCore;

  const HistoryContent = (
    <div className={styless.HistoryElementView}>
      <ContentTable>
        <ContentInfo>
          <DataTable
            value={historyResource}
            paginator
            className="tableHistory"
            rows={5}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[5, 15, 50]}
            dataKey="id"
            rowHover
            selection={selectedCustomers}
            onSelectionChange={(e) => setSelectedCustomers(e.value)}
            filters={filters}
            filterDisplay="row"
            loading={isLoadingHistoryUser}
            responsiveLayout="scroll"
            globalFilterFields={[
              "resourceType",
              "resourceName",
              "optionName",
              "userName",
              "dateOcurred",
            ]}
            emptyMessage="No customers found."
            currentPageReportTemplate="Existe {first} de {last} total {totalRecords} registros"
            size="small"
          >
            <Column
              field="resourceType"
              header="Tipo De Recurso"
              sortable
              filter
              filterPlaceholder="Buscar"
              headerStyle={{
                color: "white",
                fontFamily: "Arial",
                backgroundColor: "#f68a20",
              }}
            />
            <Column
              field="resourceName"
              header="Nombre De Recurso"
              sortable
              filter
              filterPlaceholder="Buscar"
              headerStyle={{
                color: "white",
                fontFamily: "Arial",
                backgroundColor: "#f68a20",
              }}
            />
            <Column
              field="optionName"
              header="Accion"
              sortable
              filter
              filterPlaceholder="Buscar"
              headerStyle={{
                color: "white",
                fontFamily: "Arial",
                backgroundColor: "#f68a20",
              }}
            />

            <Column
              field="userName"
              header="Usuario"
              sortable
              filter
              filterPlaceholder="Buscar"
              headerStyle={{
                color: "white",
                fontFamily: "Arial",
                backgroundColor: "#f68a20",
              }}
            />

            <Column
              field="dateOcurred"
              header="Fecha"
              sortable
              filter
              filterPlaceholder="Buscar"
              headerStyle={{
                color: "white",
                fontFamily: "Arial",
                backgroundColor: "#f68a20",
              }}
            />
            <Column
              field="path"
              header="Ruta"
              sortable
              filter
              filterPlaceholder="Buscar"
              headerStyle={{
                color: "white",
                fontFamily: "Arial",
                backgroundColor: "#f68a20",
              }}
            />
          </DataTable>
        </ContentInfo>
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
  display: flex;
  justify-content: center;
`;

const ContentInfo = styled.div`
  display: flex;
  width: 1000px;
  height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
