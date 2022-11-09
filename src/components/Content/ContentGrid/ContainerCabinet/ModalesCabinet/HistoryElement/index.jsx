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
import { clearResourceDataCore, clearResourseDataDocumental } from "../../../../../../redux/states/History";

const useStyless = makeStyles(() => ({
  HistoryElementView: {
    position: "absolute",
    width: "850px",
    height: "500px",
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
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
      <div className="HeaderHistory">
        <DataTable
          value={historyResource}
          paginator
          className="tableHistory"
          rows={5}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[5, 15, 30]}
          dataKey="id"
          rowHover
          loading={isLoadingHistoryUser}
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="row"
          responsiveLayout="scroll"
          globalFilterFields={[
            "resourceType",
            "resourceName",
            "optionName",
            "userName",
            "dateOcurred",
          ]}
          emptyMessage="Sin Informacion para este usuario."
          currentPageReportTemplate="Documento {first} de {last} existentes"
          size="small"
          resizableColumns
          columnResizeMode="fit"
          showGridlines
        >
          <Column
            field="resourceType"
            header="resourceType"
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
            header="resourceName"
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
            header="optionName"
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
            header="userName"
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
            header="dateOcurred"
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
      </div>
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
