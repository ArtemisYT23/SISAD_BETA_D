import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { SearchFilter, EditElement, DeleteElement } from "./icons";
import { setOpenModalConfigCreated } from "../../../../../redux/states/ActionConfig";
import {
  setSelectedIndexes,
  setSelectedIndexesUpdate,
} from "../../../../../redux/states/Indexes";
import IndexCreated from "../ModalesIndex/IndexCreated";
import IndexUpdate from "../ModalesIndex/IndexUpdate";
import IndexDelete from "../ModalesIndex/IndexDelete";
import LoadingSpinner from "../../../../../utilities/LoadingSpinner";
import { Tooltip } from "@material-ui/core";

const IndexContainer = () => {
  const dispatch = useDispatch();
  const { cabinetCore, indexCore, userSesion } = useSelector((store) => store);
  const { OptionsTocken } = userSesion;
  const { UpdateSelectedCabinet } = cabinetCore;
  const { IndexConfig, isLoadingIndex } = indexCore;
  const [update, setUpdate] = useState(false);
  const [delet, setDelet] = useState(false);
  const [created, setCreated] = useState(false);
  const [IndexCore, setIndexCore] = useState([]);
  const [gridApi, setGridApi] = useState({});

  useEffect(() => {
    IndexConfig.map((file, i) => {
      if (file.sequential) {
        file.sequential = i + 1;
      } else {
        file.sequential = i + 1;
      }
    });
    setIndexCore(IndexConfig);
  }, [IndexConfig]);

  useEffect(() => {
    OptionsTocken.map((n, i) => {
      //crear indice
      if (n.id == "7a102ffd-6911-4133-85a0-d5640c339780") {
        setCreated(true);
      }
      //actualizar indice
      if (n.id == "ec5c1dc3-a1c5-472b-ab63-80ed44e29eb0") {
        setUpdate(true);
      }
      //eliminar indice
      if (n.id == "65775d93-2a29-4a69-93e7-777690499564") {
        setDelet(true);
      }
    });
  }, []);

  const OpenModalIndexCreatedConfig = () => {
    dispatch(setOpenModalConfigCreated(true));
  };

  const CheckRequired = (props) => {
    return (
      <input type="checkbox" checked={props.node.data.required} />
    );
  }

  const CheckUnique = (props) => {
    return (
      <input type="checkbox" checked={props.node.data.unique}/>
    );
  }

  const EditTypeFile = (props) => {
    const invokeParentMethod = () => {
      update ? dispatch(setSelectedIndexesUpdate(props.node.data.id)) : <></>;
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <EditElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const DeleteTypeFile = (props) => {
    const invokeParentMethod = () => {
      delet ? dispatch(setSelectedIndexes(props.node.data.id)) : <></>;
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <DeleteElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const DataIndex = [
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
      minWidth: 260,
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
      headerName: "Descripcion",
      field: "description",
      filter: true,
      minWidth: 260,
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
      headerName: "Tipo De Dato",
      field: "dataTypeName",
      filter: true,
      minWidth: 260,
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
      headerName: "Lista",
      field: "listName",
      filter: true,
      minWidth: 260,
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
      headerName: "Requerido",
      field: "",
      filter: false,
      cellRenderer: CheckRequired,
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
      headerName: "Unico",
      field: "",
      filter: false,
      cellRenderer: CheckUnique,
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
      headerName: "Min Value",
      field: "minValue",
      filter: false,
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
      headerName: "Max Value",
      field: "maxValue",
      filter: false,
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

  return (
    <ContainerIndex>
      <HeadersContainer>
        <ContainerButton>
          {created && ( 
            <NewIndex onClick={(e) => OpenModalIndexCreatedConfig()}>
              Nuevo
            </NewIndex>
          )}

          {IndexConfig != "" && (
            <>
              <SearchUser
                type="text"
                id="filter-text-box"
                placeholder=" Buscar Tipo de Archivo"
                onInput={onFilterTextBoxChanged}
              />
              <ButtonSearch>
                <SearchFilter x={22} y={22} />
              </ButtonSearch>
            </>
          )}
        </ContainerButton>

        <ContainerSelect>
          <TituloSelect>
            <OptionsSelect>{UpdateSelectedCabinet?.name}</OptionsSelect>
          </TituloSelect>
        </ContainerSelect>
      </HeadersContainer>
      <br />

      {isLoadingIndex ? (
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
              rowData={IndexCore}
              columnDefs={DataIndex}
              defaultColDef={defaultColDef}
              animateRows={true}
            ></AgGridReact>
          </div>
        </TableContainer>
      )}

      <IndexCreated />
      <IndexUpdate />
      <IndexDelete />

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

export default IndexContainer;

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
`;

const SearchUser = styled.input`
  width: 45%;
  height: 2rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
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
  &:disabled {
    background-color: #c29a44;
  }
`;

const ContainerSelect = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-end;
  border: 1px solid var(--lineColor);
`;

const TituloSelect = styled.select`
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--primaryColor);
  text-decoration: none;
  text-align: center;
  border: 1px solid var(--primaryColor);
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const OptionsSelect = styled.option`
  font-weight: bold;
  color: var(--primaryColor);
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
