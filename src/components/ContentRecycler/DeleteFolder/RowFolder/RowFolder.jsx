import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { SearchFilter, RestoredElement } from "./icons";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import {
  getAllDeleteFolderRestored,
  RestoredFolder,
} from "../../../../redux/formData/ResourceData";

const RowFolder = () => {
  const dispatch = useDispatch();
  const { dataResult } = useSelector((store) => store);
  const { isLoadingRestored, folderRestored } = dataResult;
  const [gridApi, setGridApi] = useState({});
  const [FileCore, setFileCore] = useState([]);

  useEffect(() => {
    if (folderRestored == "") {
      dispatch(getAllDeleteFolderRestored());
    }
  }, []);

  useEffect(() => {
    folderRestored.map((file, i) => {
      if (file.sequential) {
        file.sequential = i + 1;
        file.resource = "FOLDER";
      } else {
        file.sequential = i + 1;
        file.resource = "FOLDER";
      }
    });
    setFileCore(folderRestored);
  }, [folderRestored]);

  const RestoredTypeFile = (props) => {
    const invokeParentMethod = () => {
      dispatch(RestoredFolder(props.node.data.id));
    };

    return (
      <ButtonOptions onClick={invokeParentMethod}>
        <RestoredElement x={30} y={30} />
      </ButtonOptions>
    );
  };

  const DataFiles = [
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
      headerName: "Recurso",
      field: "resource",
      filter: true,
      minWidth: 300,
      rezisable: true,
      sortable: true,
      floatingFilter: true,
    },
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
      headerName: "Descripcion",
      field: "description",
      filter: true,
      minWidth: 300,
      rezisable: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "Restaurar",
      field: "",
      filter: false,
      cellRenderer: RestoredTypeFile,
      minWidth: 150,
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
    <ContainerGroupDelete>
      <HeadersContainer>
        <ContainerButton>
          <SearchUser
            type="text"
            id="filter-text-box"
            placeholder=" Buscar Carpeta"
            onInput={onFilterTextBoxChanged}
          />
          <ButtonSearch>
            <SearchFilter x={22} y={22} />
          </ButtonSearch>
        </ContainerButton>
      </HeadersContainer>
      <br />

      {isLoadingRestored ? (
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
              rowData={FileCore}
              columnDefs={DataFiles}
              defaultColDef={defaultColDef}
              animateRows={true}
            ></AgGridReact>
          </div>
        </TableContainer>
      )}
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
    </ContainerGroupDelete>
  );
};

export default RowFolder;

const ContainerGroupDelete = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 1rem 0 0 0;
`;

const HeadersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ContainerButton = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
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
