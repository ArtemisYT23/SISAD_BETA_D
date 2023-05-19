import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";

import {
  setOpenModalCreatedResource,
  setOpenModalUpdateResource,
  setOpenModalDeleteResource,
  setOpenModalUpdateResourceFolder,
} from "../../../../redux/states/ActionSecurity";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import HeaderSecurity from "../../HeaderSecurity/HeaderSecurity";
import { setSelectedUserCore } from "../../../../redux/states/UserCore";
import { DeleteElement, EditElement, SearchFilter } from "./icons";
import ResourceCreated from "../ModalesResourse/ResourceCreated";
import ResourceUpdatePermision from "../ModalesResourse/ResourceUpdate";
import ResourceFolderUpdate from "../ModalesResourse/ResourceFolderUpdate";
import ResourceDeleteCore from "../ModalesResourse/ResourceDelete";
import { Tooltip } from "@material-ui/core";

const Resource = () => {
  const dispatch = useDispatch();
  const { userCore, resourceCore } = useSelector((store) => store);
  const { ResourcePermision, isLoadingResource } = resourceCore;
  const { UserList } = userCore;
  const [gridApi, setGridApi] = useState({});
  const [resourseData, setResourseData] = useState([]);

  useEffect(() => {
    // console.log(ResourcePermision);
    const User = [];
    UserList?.forEach((index) => {
      ResourcePermision?.forEach((resour, i) => {
        if (index.id == resour.userId) {
          const filterUser = {
            id: index.id,
            name: index.userName,

          };
          console.log(i);
          User.push(filterUser);
        }
      });
    });
    // console.log(User);
    let hash = {};
    const array = User.filter((o) =>
      hash[o.id] ? false : (hash[o.id] = true)
    );
    setResourseData(array);
  }, [ResourcePermision]);

  const OpenModalCreatedResource = () => {
    dispatch(setOpenModalCreatedResource(true));
  };

  const Title = "Gestion de Recursos";
  const SubTitle = "Listado del Recursos del sistema y asignaciones";

  const UpdateCabinet = (props) => {
    const invokeParentMethod = () => {
      dispatch(setSelectedUserCore(props.node.data.id));
      dispatch(setOpenModalUpdateResource(true));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <EditElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const UpdateFolder = (props) => {
    const invokeParentMethod = () => {
      dispatch(setSelectedUserCore(props.node.data.id));
      dispatch(setOpenModalUpdateResourceFolder(true));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <EditElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const DeleteResource = (props) => {
    const invokeParentMethod = () => {
      dispatch(setSelectedUserCore(props.node.data.id));
      dispatch(setOpenModalDeleteResource(true));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <DeleteElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const DataResource = [
    {
      headerName: "Nombre",
      field: "name",
      filter: true,
      minWidth: 300,
      rezisable: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "Editar Gabinete",
      field: "",
      filter: false,
      cellRenderer: UpdateCabinet,
      minWidth: 90,
      rezisable: true,
      sortable: true,
      floatingFilter: false,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Editar Carpetas",
      field: "",
      filter: false,
      cellRenderer: UpdateFolder,
      minWidth: 90,
      rezisable: true,
      sortable: true,
      floatingFilter: false,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Eliminar Recurso",
      field: "",
      filter: false,
      cellRenderer: DeleteResource,
      minWidth: 90,
      rezisable: true,
      sortable: true,
      floatingFilter: false,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
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

  const onFilterTextBoxChanged = () => {
    gridApi.setQuickFilter(document.getElementById("filter-text-box").value);
  };

  return (
    <SecurityPanelResource>
      <HeaderSecurity Title={Title} SubTitle={SubTitle} />
      <br />
      <HeadersContainer>
        <ContainerButton>
          <Tooltip title="Nuevo">
            <NewIndex onClick={(e) => OpenModalCreatedResource()}>
              Agregar
            </NewIndex>
          </Tooltip>
          <SearchUser
            type="text"
            id="filter-text-box"
            placeholder=" Buscar Tipo de Archivo"
            onInput={onFilterTextBoxChanged}
          />
          <ButtonSearch>
            <SearchFilter x={22} y={22} />
          </ButtonSearch>
        </ContainerButton>
        <ContainerSearch />
      </HeadersContainer>
      <br />

      {isLoadingResource ? (
        <LoadingSpinner />
      ) : (
        <TableContainer>
           <div
            id="myGrid"
            style={{ width: "100%", height: "100%" }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              onGridReady={onGridReady}
              rowData={resourseData}
              columnDefs={DataResource}
              defaultColDef={defaultColDef}
              animateRows={true}
            ></AgGridReact>
          </div>
        </TableContainer>
      )}

      <ResourceCreated />
      <ResourceUpdatePermision />
      <ResourceFolderUpdate />
      <ResourceDeleteCore />

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
    </SecurityPanelResource>
  );
};

export default Resource;

const SecurityPanelResource = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeadersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ContainerButton = styled.div`
  width: 65%;
  display: flex;
  justify-content: flex-start;
  @media (max-width: 767px) {
    width: 96%;
  }
`;

const NewIndex = styled.button`
  border: none;
  padding: 0.5rem;
  margin: 0 0.5rem 0 0;
  width: 20%;
  color: var(--white);
  background-color: var(--primaryColor);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 0.5rem 0.5rem;
  cursor: pointer;
`;

const SearchUser = styled.input`
  width: 45%;
  height: 2rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
  @media (max-width: 767px) {
    width: 70%;
  }
`;

const ButtonSearch = styled.button`
  padding: 0.5rem;
  width: 2.2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f68a20;
  background: none;
`;

const ContainerSearch = styled.div`
  width: 50%;
  display: flex;
  @media (max-width: 767px) {
    display: none;
  }
`;

const TableContainer = styled.div`
  width: 97%;
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableRaid = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
`;

const THN = styled.th`
  width: 4rem;
  height: 2rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const THD = styled.th`
  width: 8rem;
  height: 2rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const TH = styled.th`
  width: 12rem;
  height: 2.1rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const TD1 = styled.td`
  font-size: 0.9rem;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #5f5f5f;
  height: 2.4rem;
  border: 1px solid #c4c4c4;
`;

const ContentOptions = styled.div`
  display: flex;
`;

const ContainerEdit = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ContainerDelete = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonOptions = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;




