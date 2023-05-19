import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import {
  setOpenModalCreatedUser,
  setOpenModalDeleteUser,
  setOpenModalUpdateUser,
  setChangePasswordModalGenerate
} from "../../../../redux/states/ActionSecurity";
import { setSelectedUserCore } from "../../../../redux/states/UserCore";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import HeaderSecurity from "../../HeaderSecurity/HeaderSecurity";
import UserCreated from "../ModalesUser/UserCreated";
import UserDelete from "../ModalesUser/UserDelete";
import UserUpdate from "../ModalesUser/UserUpdate";
import GeneratePassword from "../ModalesUser/GeneratePassword";
import { DeleteElement, EditElement, SearchFilter } from "./icons";
import { Tooltip } from "@material-ui/core";

const SecurityUser = () => {
  const dispatch = useDispatch();
  const { userCore } = useSelector((store) => store);
  const { UserList, isLoadingUser } = userCore;
  const [gridApi, setGridApi] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    UserList.map((file, i) => {
      if (file.sequential) {
        file.sequential = i + 1;
      } else {
        file.sequential = i + 1;
      }
    });
    setTableData(UserList);
  }, [UserList]);

  const OpenModalUserCreatedConfig = () => {
    dispatch(setOpenModalCreatedUser(true));
  };

  const EditPassword = (props) => {
    const invokeParentMethod = () => {
      dispatch(setSelectedUserCore(props.node.data.id));
      dispatch(setChangePasswordModalGenerate(true));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <EditElement x={30} y={30} />
      </ButtonOptions>
    );
  }

  const EditTypeFile = (props) => {
    const invokeParentMethod = () => {
      dispatch(setSelectedUserCore(props.node.data.id));
      dispatch(setOpenModalUpdateUser(true));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <EditElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const DeleteTypeFile = (props) => {
    const invokeParentMethod = () => {
      dispatch(setSelectedUserCore(props.node.data.id));
      dispatch(setOpenModalDeleteUser(true));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <DeleteElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const DataUser = [
    {
      headerName: "Id",
      field: "sequential",
      pinned: "left",
      filter: false,
      width: 70,
      rezisable: true,
      sortable: true,
    },
    {
      headerName: "Nombre",
      field: "userName",
      filter: true,
      minWidth: 300,
      rezisable: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "Email",
      field: "email",
      filter: true,
      minWidth: 300,
      rezisable: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "Perfil",
      field: "profileName",
      filter: true,
      minWidth: 300,
      rezisable: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "Empresa",
      field: "businessName",
      filter: true,
      minWidth: 300,
      rezisable: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "Cambio Contraseña",
      field: "",
      filter: false,
      cellRenderer: EditPassword,
      width: 150,
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
      headerName: "Editar",
      field: "",
      filter: false,
      cellRenderer: EditTypeFile,
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
      headerName: "Eliminar",
      field: "",
      filter: false,
      cellRenderer: DeleteTypeFile,
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

  const Title = "Gestion de Seguridad";
  const SubTitle =
    "Listado de Usuarios existentes y preferencias de perfiles sisad cloud";
  return (
    <SecurityPanelUser>
      <HeaderSecurity Title={Title} SubTitle={SubTitle} />
      <br />
      <HeadersContainer>
        <ContainerButton>
          <Tooltip title="Nuevo">
            <NewIndex onClick={(e) => OpenModalUserCreatedConfig()}>
              Nuevo
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

      {isLoadingUser ? (
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
              rowData={tableData}
              columnDefs={DataUser}
              defaultColDef={defaultColDef}
              animateRows={true}
            ></AgGridReact>
          </div>
        </TableContainer>
      )}

      <UserCreated />
      <UserUpdate />
      <UserDelete />
      <GeneratePassword />

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
    </SecurityPanelUser>
  );
};

export default SecurityUser;

const SecurityPanelUser = styled.div`
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

const ContainerSearch = styled.div`
  width: 50%;
  display: flex;
  @media (max-width: 767px) {
    display: none;
  }
`;

const SearchUser = styled.input`
  width: 45%;
  height: 2rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
  @media (max-width: 767px) {
    width: 60%;
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

const TableContainer = styled.div`
  width: 97%;
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonOptions = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
