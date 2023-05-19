import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { Dropdown } from "primereact/dropdown";
import {
  getAllHistoryUserCore,
  getAllHistoryUserDocu,
  setClearDataMemoryHistory,
} from "../../../../redux/states/History";
import HeaderSecurity from "../../HeaderSecurity/HeaderSecurity";
import { SearchFilter } from "../../../Content/ContentGrid/ContainerConfig/IndexContainer/icons";
import { Selected } from "../../../../Styles/ModalesStyles/modalStyle";

const HistoryUser = () => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { userCore, historyCore } = useSelector((store) => store);
  const { UserList } = userCore;
  const { historyUserCore } = historyCore;
  const [gridApi, setGridApi] = useState({});

  const [usuarios, setUsuarios] = useState([]);
  const [pagesNumber, setPagesNumber] = useState(10);
  const [activeResource, setActiveResource] = useState(false);
  const [activeDocumental, setActiveDocumental] = useState(false);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageTable = 500;

  const onCountryChange = (e) => {
    if (e.value != undefined) {
      setSelectedCountry(e.value);
    }
    if (e.value === undefined) {
      setPagesNumber(100);
      setSelectedCountry(e.value);
      setActiveResource(false);
      setActiveDocumental(false);
      dispatch(setClearDataMemoryHistory());
    }
  };

  const onPageChangeMas = () => {
    if (historyUserCore != "") {
      const sumPages = paginationPageSize + pagesNumber;
      setPagesNumber(sumPages);

      if (activeResource == true && activeDocumental == false) {
        dispatch(getAllHistoryUserCore(selectedCountry, sumPages));
      }
      if (activeResource == false && activeDocumental == true) {
        dispatch(getAllHistoryUserDocu(selectedCountry, sumPages));
      }
    }
  };

  const onPageChangeMenos = () => {
    if (historyUserCore != "") {
      if (pagesNumber == paginationPageSize) {
      }
      if (pagesNumber != paginationPageSize) {
        const resPages = pagesNumber - paginationPageSize;
        setPagesNumber(resPages);

        if (activeResource == true && activeDocumental == false) {
          dispatch(getAllHistoryUserCore(selectedCountry, resPages));
        }
        if (activeResource == false && activeDocumental == true) {
          dispatch(getAllHistoryUserDocu(selectedCountry, resPages));
        }
      }
    }
  };

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

  const onFilterTextBoxChanged = () => {
    gridApi.setQuickFilter(document.getElementById("filter-text-box").value);
  };

  const ResourceActive = (e) => {
    setActiveResource(true);
    setActiveDocumental(false);
    dispatch(getAllHistoryUserCore(selectedCountry, paginationPageSize));
  };

  const DocumentalActive = (e) => {
    setActiveResource(false);
    setActiveDocumental(true);
    dispatch(getAllHistoryUserDocu(selectedCountry, paginationPageSize));
  };

  const handleChange = (value) => {
    if(activeResource == true){
      dispatch(getAllHistoryUserCore(selectedCountry, value));
    }

    if(activeDocumental == true){
      dispatch(getAllHistoryUserDocu(selectedCountry, value));
    }
  }

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

        {selectedCountry && (
          <ContentCheck>
            <label>Recursos</label>
            <input
              type="checkbox"
              onChange={ResourceActive}
              checked={activeResource}
              value="Recursos"
            />

            <label>Documental</label>
            <input
              type="checkbox"
              onChange={DocumentalActive}
              checked={activeDocumental}
              value="Documental"
            />
          </ContentCheck>
        )}

        <ContentSearching>
          <SearchUser
            type="text"
            id="filter-text-box"
            placeholder=" Buscar ..."
            onInput={onFilterTextBoxChanged}
          />

          <ButtonSearch>
            <SearchFilter x={22} y={22} />
          </ButtonSearch>

          {/* <ButtonSearch onClick={() => onPageChangeMenos()}>-</ButtonSearch>
          <ButtonSearch onClick={() => onPageChangeMas()}>+</ButtonSearch> */}
        </ContentSearching>

        <ContentSelect>
          <Selected onChange={(e) => handleChange(e.target.value)}>
            <option hidden>10</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={2000}>2000</option>
          </Selected>
        </ContentSelect>
      </ContentSearch>

      <ContentTable>
        <div
          id="myGrid"
          style={{ width: "100%", height: "100%" }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            pagination={pagination}
            paginationPageSize={paginationPageTable}
            onGridReady={onGridReady}
            rowData={historyUserCore}
            columnDefs={DataHistory}
            defaultColDef={defaultColDef}
            animateRows={true}
          ></AgGridReact>
        </div>
      </ContentTable>
    </ContainerHistory>
  );
};

export default HistoryUser;

const ContainerHistory = styled.div`
  width: 100%;
`;

const ContentSelect = styled.div`
  width: 35%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentCheck = styled.div`
  width: 30%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    margin: 0 .5rem 0 .5rem;
  }
`;

const ContentSearching = styled.div`
  width: 50%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentSearch = styled.div`
  width: 80%;
  height: 4rem;
  display: flex;
  @media (max-width: 767px) {
    margin: 0 0 0 1rem;
  }
`;

const ContentTable = styled.div`
  width: 98%;
  height: 420px;
  display: flex;
  justify-content: center;
`;

const SearchUser = styled.input`
  width: 45%;
  height: 2.7rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
`;

const ButtonSearch = styled.button`
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f68a20;
  background: none;
  cursor: pointer;
`;
