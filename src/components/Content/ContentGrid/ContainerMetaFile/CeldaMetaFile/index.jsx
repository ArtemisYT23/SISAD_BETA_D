import { Tooltip } from "@material-ui/core";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setSelectedFileDocumentary,
  setSelectedUrlFileCore,
} from "../../../../../redux/states/Files";
import { setOpenDetalleModal } from "../../../../../redux/states/ActionDocumentary";
import { setSelectedMetadataDocument } from "../../../../../redux/states/Metadata";
import {
  setSelectedDocumentDocu,
  cleanerSelectedDocument,
} from "../../../../../redux/states/Document";

const CeldaMetaFile = ({
  folderId,
  documentId,
  values,
  documentSequential,
  file,
}) => {
  const dispatch = useDispatch();
  const { documentary } = useSelector((store) => store);
  const { SelectedDocument } = documentary;
  const [gridApi, setGridApi] = useState({});

  const OpenFileNavigator = (props) => {
    const invokeParentMethod = () => {
      if (props.node.data.extension == ".pdf") {
        window.open(props.node.data.fileData);
      }
      if (props.node.data.extension == ".xlsx") {
        window.open(
          `https://view.officeapps.live.com/op/embed.aspx?src=${props.node.data.fileData}`
        );
      }
      if (props.node.data.extension == ".docx") {
        `https://view.officeapps.live.com/op/embed.aspx?src=${props.node.data.fileData}`;
      }
    };

    return <ButtonModal onClick={invokeParentMethod}>Ver</ButtonModal>;
  };

  const OpenPreviewFile = (props) => {
    const invokeParentMethod = () => {
      dispatch(setOpenDetalleModal(true));
      dispatch(setSelectedUrlFileCore(props.node.data.fileData));
      dispatch(setSelectedFileDocumentary(props.node.data.id));
      dispatch(setSelectedMetadataDocument(props.node.data.documentId));
    };

    return <ButtonModal onClick={invokeParentMethod}>Preview</ButtonModal>;
  };

  const DistintExtension = (props) => {
    return (
      <ContainerDistint>
        {(() => {
          switch (props.node.data.extension) {
            case ".docx":
              return (
                <DistintivoPDF color="#356be0">
                  <TypeFile>{props.node.data.extension}</TypeFile>
                </DistintivoPDF>
              );
            case ".xlsx":
              return (
                <DistintivoPDF color="green">
                  <TypeFile>{props.node.data.extension}</TypeFile>
                </DistintivoPDF>
              );
            default:
              return (
                <DistintivoPDF color="red">
                  <TypeFile>{props.node.data.extension}</TypeFile>
                </DistintivoPDF>
              );
          }
        })()}
      </ContainerDistint>
    );
  };

  const DataFiles = [
    {
      headerName: "Id",
      field: "fileSequential",
      pinned: "left",
      filter: false,
      width: 70,
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Ver",
      cellRenderer: OpenFileNavigator,
      width: 100,
      filter: false,
      resizable: true,
      pinned: "left",
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Previsualizar",
      cellRenderer: OpenPreviewFile,
      pinned: "left",
      width: 100,
      filter: false,
      resizable: true,
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
    {
      headerName: "Tipo Archivo",
      field: "fileTypeName",
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Nombre",
      field: "name",
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Descripcion",
      field: "description",
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    {
      headerName: "Tipo",
      field: "extension",
      cellRenderer: DistintExtension,
      filter: true,
      width: 90,
      floatingFilter: true,
      resizable: true,
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

  const DocumentEnter = (id) => {
    dispatch(setSelectedDocumentDocu(id));
  };

  const DeleteSelectedDocument = () => {
    dispatch(cleanerSelectedDocument());
  };

  return (
    <ContainerCeldaRegister>
      <MetadataCelda>
        <Content>{documentSequential}</Content>
        {values ? (
          values.map((value, index) => (
            <>
              <Tooltip title={value}>
                <ContentCelda>
                  <p>{value}</p>
                </ContentCelda>
              </Tooltip>
            </>
          ))
        ) : (
          <>... cargando</>
        )}

        <>
          {SelectedDocument?.id == documentId ? (
            <Cancel onClick={() => DeleteSelectedDocument()}>Cerrar</Cancel>
          ) : (
            <Action onClick={() => DocumentEnter(documentId)}>Abrir</Action>
          )}
        </>
      </MetadataCelda>

      {SelectedDocument?.id == documentId && (
        <ContainerFiles>
          <div
            id="myGrid"
            style={{ width: "100%", height: "100%" }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              onGridReady={onGridReady}
              rowData={file}
              columnDefs={DataFiles}
              defaultColDef={defaultColDef}
              animateRows={true}
            ></AgGridReact>
          </div>
        </ContainerFiles>
      )}
    </ContainerCeldaRegister>
  );
};

export default CeldaMetaFile;

const ContainerCeldaRegister = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MetadataCelda = styled.div`
  width: 99%;
  height: 40px;
  display: flex;
  align-items: center;
  color: #f68a20;
  /*color: #c4c4c4;*/
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  /* border: 1px solid #f68a20; */
  border: 1px solid #c4c4c4;

  span {
    margin: 0 1rem 0 1rem;
  }
`;

const Content = styled.div`
  width: 70px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ContentCelda = styled.div`
  width: 190px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;

  p {
    width: 190px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const ContainerFiles = styled.div`
  width: 99%;
  height: 350px;
`;

const ButtonModal = styled.button`
  color: white;
  background-color: var(--primaryColor);
  width: 70px;
  height: 1.5rem;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ContainerDistint = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DistintivoPDF = styled.div`
  background: ${(props) => props.color};
  width: 2.8rem;
  height: 1.5rem;
  border-radius: 0.5rem 0 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TypeFile = styled.span`
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
`;

const Action = styled.button`
  width: 60px;
  height: 75%;
  line-height: 2;
  margin: 0 0.5rem 0 0.5rem;
  border-radius: 13px;
  border: none;
  background-color: var(--primaryColor);
  color: #fff;
  cursor: pointer;
`;

const Cancel = styled.button`
  width: 60px;
  height: 30px;
  line-height: 2;
  margin: 0 0.5rem 0 0.5rem;
  border-radius: 13px;
  border: 1px solid var(--primaryColor);
  background-color: #fff;
  color: var(--primaryColor);
  font-weight: bold;
  cursor: pointer;
`;
