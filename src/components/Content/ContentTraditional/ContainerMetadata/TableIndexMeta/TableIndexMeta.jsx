import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FilesPreview from "../../../ContentGrid/ContainerDocFile/ContainerFile/ModalesFile/FilesPreview";
import DownLoadMasive from "../../../ContentGrid/ContainerDocFile/ModalesDocument/DownloadMasive";
import CreatedMetadata from "../../../../Content/ContentGrid/ContainerDocFile/ModalesDocument/MetadataCreated";
import UpdateMetadata from "../../../ContentGrid/ContainerDocFile/ModalesDocument/MetadataUpdate";
import DeleteMetadata from "../../../ContentGrid/ContainerDocFile/ModalesDocument/MetadataDelete";
import { getFileAllDocument } from "../../../../../redux/states/Files";
import {
  setSelectedDocumentDocu,
  setSaveReferenceTable,
} from "../../../../../redux/states/Document";
import { setFilterMetadataByDocument } from "../../../../../redux/states/Metadata";
import {
  setOpenModalUploadFile,
  setOpenModalDownloadMasive,
  setOpenModalMetadataCreated,
  setOpenModalMetadataUpdate,
  setOpenModalMetadataDelete,
} from "../../../../../redux/states/ActionDocumentary";
import { setMetadaValuesCabinet } from "../../../../../redux/formData/FileData";
import { getTypeFileByFolderFolder } from "../../../../../redux/states/FileType";
import { Button } from "primereact/button";
import toast, { Toaster } from "react-hot-toast";

const ChildMessageRenderer = (props) => {
  const dispatch = useDispatch();
  const invokeParentMethod = () => {
    console.log(props.node.data);
    dispatch(setOpenModalUploadFile(true));
    dispatch(getFileAllDocument(props.node.data.documentId));
    // dispatch(getTypeFileByFolderFolder(props.node.data.folderId));
  };

  return <ButtonModal onClick={invokeParentMethod}>Ver Archivos</ButtonModal>;
};

const TableIndexMeta = () => {
  const gridRef = useRef();
  const dispatch = useDispatch();
  const { indexCore, metaCore, folderCore, documentary, cabinetCore } =
    useSelector((store) => store);
  const { SelectedCabinet } = cabinetCore;
  const { referent } = documentary;
  const { IndexConfig } = indexCore;
  const { MetadataCabinet, metaDocument } = metaCore;
  const { SelectedFolderMeta, SelectedFolder } = folderCore;
  const [cols, setCol] = useState([]);
  const [nameValue, setNameValue] = useState([]);

  useEffect(() => {
    dispatch(setSaveReferenceTable(gridRef));
    IndexConfig.sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      }
      return IndexConfig;
    });
    const DataMeta = [
      {
        headerName: "Acciones",
        field: "documentId",
        cellRenderer: ChildMessageRenderer,
        minWidth: 150,
        filter: false,
      },
    ];

    IndexConfig.map((indice, i) => {
      const head = {
        headerName: indice.name,
        field: `values.${i}`,
      };
      DataMeta.push(head);
    });
    setCol(DataMeta);
    console.log(cols);
  }, [MetadataCabinet]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      floatingFilter: true,
    };
  }, []);

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows[0].documentId);
    if (selectedRows[0].documentId != "") {
      dispatch(setSelectedDocumentDocu(selectedRows[0].documentId));
      dispatch(setFilterMetadataByDocument(selectedRows[0].documentId));
    }
  };

  const loadingCellRendererParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  const AggMetadataForValues = () => {
    MetadataCabinet.forEach((meta, i) => {
      const ob1 = {
        docum: meta.documentId,
        cod: meta.values[0],
        value: meta.values[1],
      };
      nameValue.push(ob1);
    });
    dispatch(setMetadaValuesCabinet(nameValue));
    setNameValue([]);
  };

  return (
    <ContainerTable>
      <HeaderMantent>
        <SpaceLine />
        <SpaceLine />

        {SelectedFolderMeta || SelectedFolder ? (
          <Button
            type="button"
            title="CREAR"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={(e) => dispatch(setOpenModalMetadataCreated(true))}
          />
        ) : (
          <></>
        )}
        <SpaceLine />
        <SpaceLine />

        <Button
          type="button"
          title="EDITAR"
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={() => dispatch(setOpenModalMetadataUpdate(true))}
        />
        <SpaceLine />
        <SpaceLine />

        <Button
          type="button"
          title="ELIMINAR"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => dispatch(setOpenModalMetadataDelete(true))}
        />

        <SpaceLine />
        <SpaceLine />

        {SelectedCabinet && (
          <Button
            type="button"
            title="DESCARGA MASIVA"
            icon="pi pi-download"
            className="p-button-info"
            onClick={() => {
              dispatch(setOpenModalDownloadMasive(true)),
                AggMetadataForValues();
            }}
          />
        )}
      </HeaderMantent>
      <div
        id="myGrid"
        style={{ width: '100%', height: '100%' }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          ref={referent}
          rowData={MetadataCabinet}
          columnDefs={cols}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection={"single"}
          onRowClicked={onSelectionChanged}
          loadingCellRendererParams={loadingCellRendererParams}
        ></AgGridReact>
        
        <FilesPreview />
        <DownLoadMasive />
        <CreatedMetadata />
        <UpdateMetadata />
        <DeleteMetadata />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 3500,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />
    </ContainerTable>
  );
};

export default TableIndexMeta;

const ContainerTable = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderMantent = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  margin: 0 0 0.5rem 0;
`;

const SpaceLine = styled.div`
  margin: 0 0.5rem 0 0;
`;

const ButtonModal = styled.button`
  color: white;
  background-color: var(--primaryColor);
  width: 100px;
  height: 1.5rem;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
`;
