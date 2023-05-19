import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { SearchFilter, EditElement, DeleteElement } from "./icons";
import {
  setOpenModalTypeDataCreated,
  setOpenModalTypeDataUpdate,
  setOpenTypeDataDelete,
} from "../../../../../redux/states/ActionConfig";
import { setSelectedTypeDataConfig } from "../../../../../redux/states/DataType";
import DataTypeCreated from "../ModalesDataType/DataTypeCreated";
import DataTypeUpdate from "../ModalesDataType/DataTypeUpdate";
import DataTypeDelete from "../ModalesDataType/DataTypeDelete";
import LoadingSpinner from "../../../../../utilities/LoadingSpinner";

const DataTypeContent = () => {
  const dispatch = useDispatch();
  const { typeDataCore } = useSelector((store) => store);
  const { isLoadingDataType, TypeData } = typeDataCore;
  const [gridApi, setGridApi] = useState({});
  const [DataCore, setDataCore] = useState([]);

  useEffect(() => {
    TypeData.map((file, i) => {
      if (file.sequential) {
        file.sequential = i + 1;
      } else {
        file.sequential = i + 1;
      }
    });
    console.log(TypeData);
    setDataCore(TypeData);
  }, [TypeData]);

  const OpenModalDataTypeCreatedConfig = () => {
    dispatch(setOpenModalTypeDataCreated(true));
  };

  const EditTypeData = (props) => {
    const invokeParentMethod = () => {
      dispatch(setSelectedTypeDataConfig(props.node.data.id));
      dispatch(setOpenModalTypeDataUpdate(true));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <EditElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const DeleteTypeData = (props) => {
    const invokeParentMethod = () => {
      dispatch(setSelectedTypeDataConfig(props.node.data.id));
      dispatch(setOpenTypeDataDelete(true));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <DeleteElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const ActiveData = (props) => {
    return (
      <input type="checkbox" checked={true} />
    );
  };

  const DataType = [
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
      field: "name",
      filter: true,
      minWidth: 300,
      rezisable: true,
      sortable: true,
      floatingFilter: true,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Estado",
      field: "",
      filter: false,
      cellRenderer: ActiveData,
      minWidth: 300,
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
      cellRenderer: EditTypeData,
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
      cellRenderer: DeleteTypeData,
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
    <ContainerIndex>
      <HeadersContainer>
        <ContainerButton>
          <NewIndex onClick={(e) => OpenModalDataTypeCreatedConfig()}>
            Nuevo
          </NewIndex>
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
        <ContainerSelect />
      </HeadersContainer>
      <br />

      {isLoadingDataType ? (
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
              rowData={DataCore}
              columnDefs={DataType}
              defaultColDef={defaultColDef}
              animateRows={true}
            ></AgGridReact>
          </div>
        </TableContainer>
      )}

      <DataTypeCreated />
      <DataTypeUpdate />
      <DataTypeDelete />

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
    </ContainerIndex>
  );
};

export default DataTypeContent;

const ContainerIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 1rem 0 0 0;
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

const ContainerSelect = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-end;
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

const ButtonOptions = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
