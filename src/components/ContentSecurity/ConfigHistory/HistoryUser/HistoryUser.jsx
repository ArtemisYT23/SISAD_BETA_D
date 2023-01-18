import styled from "styled-components";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./styles/TableHistory.css";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { getAllHistoryUserCore } from "../../../../redux/states/History";
import { useDispatch, useSelector } from "react-redux";
import HeaderSecurity from "../../HeaderSecurity/HeaderSecurity";

const HistoryUser = () => {
  const dispatch = useDispatch();
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dataUserHistory, setDataUserhistory] = useState([]);

  const { userCore, historyCore } = useSelector((store) => store);
  const { UserList } = userCore;
  const { historyUser, historyUserCore, isLoadingHistoryUser } = historyCore;

  const [usuarios, setUsuarios] = useState([]);
  const [filters, setFilters] = useState({
    resourceType: { value: "", matchMode: "contains" },
    resourceName: { value: "", matchMode: "contains" },
    optionName: { value: "", matchMode: "contains" },
    userName: { value: "", matchMode: "contains" },
    dateOcurred: { value: "", matchMode: "contains" },
  });

  const onCountryChange = (e) => {
    console.log(e.value);
    setSelectedCountry(e.value);
    dispatch(getAllHistoryUserCore(e.value));
  };

  useEffect(() => {
    console.log(historyUser);
    console.log(historyUser);
    if (historyUser != "" || historyUserCore != "") {
      const array = historyUser.concat(historyUserCore);
      console.log(array);
      setDataUserhistory(array);
    } else {
      setDataUserhistory([]);
    }
  }, [historyUserCore, historyUser]);

  useEffect(() => {
    const Users = [];
    UserList.forEach((element) => {
      const data = {
        id: element.id,
        name: element.userName,
      };
      Users.push(data);
      setUsuarios(Users);
    });
  }, [UserList]);

  const Title = "Historial de Usuarios";
  const SubTitle = "Listado de Acciones dentro del sistema por cada usuario";

  return (
    <ContainerHistory>
      <HeaderSecurity Title={Title} SubTitle={SubTitle} />
      <br />
      <ContentSearch>
        <ContentSelect>
          <Dropdown
            value={selectedCountry}
            options={usuarios}
            onChange={onCountryChange}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder="Seleccione un Usuario"
          />
        </ContentSelect>
      </ContentSearch>

      <ContentTable>
        <ContentInfo>
          <DataTable
            value={dataUserHistory}
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
              header="Tipo de Recurso"
              sortable
              filter
              filterPlaceholder="Buscar"
              headerStyle={{
                color: "white",
                fontFamily: "Arial",
                backgroundColor: "#f68a20",
              }}
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="resourceName"
              header="Nombre de Recurso"
              sortable
              filter
              filterPlaceholder="Buscar"
              headerStyle={{
                color: "white",
                fontFamily: "Arial",
                backgroundColor: "#f68a20",
              }}
              style={{ minWidth: "14rem" }}
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
              style={{ minWidth: "14rem" }}
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
              style={{ minWidth: "14rem" }}
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
              style={{ minWidth: "14rem" }}
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
              style={{ minWidth: "14rem" }}
            />
          </DataTable>
        </ContentInfo>
      </ContentTable>
    </ContainerHistory>
  );
};

export default HistoryUser;

const ContainerHistory = styled.div`
  width: 100%;
`;

const ContentSelect = styled.div`
  width: 100%;
  height: 4rem;
`;

const ContentInfo = styled.div`
  display: flex;
  width: 1000px;
  height: 400px;
  overflow: scroll;
`;

const ContentSearch = styled.div`
  width: 80%;
  height: 4rem;
  margin: 0 0 0 2rem;
  @media (max-width: 767px) {
    margin: 0 0 0 1rem;
  }
`;

const ContentTable = styled.div`
  display: flex;
  justify-content: center;
`;
