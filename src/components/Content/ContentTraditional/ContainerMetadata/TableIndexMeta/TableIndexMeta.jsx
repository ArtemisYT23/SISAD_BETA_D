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
import FilesPreview from "../../../ContentGrid/ContainerDocFile/ContainerFile/ModalesFile/FilesPreview/FilePreview";
import DownLoadMasive from "../../../ContentGrid/ContainerDocFile/ModalesDocument/DownloadMasive/DownloadMasive";
import CreatedMetadata from "../../../../Content/ContentGrid/ContainerDocFile/ModalesDocument/MetadataCreated";
import UpdateMetadata from "../../../ContentGrid/ContainerDocFile/ModalesDocument/MetadataUpdate";
import DeleteMetadata from "../../../ContentGrid/ContainerDocFile/ModalesDocument/MetadataDelete";
import { getFileAllDocument } from "../../../../../redux/states/Files";
import { setCountFileTypeByDocument } from "../../../../../redux/states/FileType";
import {
  setSelectedDocumentDocu,
  setSaveReferenceTable,
  setDetailByFolderDocument,
} from "../../../../../redux/states/Document";
import {
  setFilterMetadataByDocument,
  getMetadataByCabinet,
  getMetadataByCabinetFilter,
  setMetadataByDateByFolderId,
} from "../../../../../redux/states/Metadata";
import {
  setOpenModalUploadFile,
  setOpenModalDownloadMasive,
  setOpenModalMetadataCreated,
  setOpenModalMetadataUpdate,
  setOpenModalMetadataDelete,
} from "../../../../../redux/states/ActionDocumentary";
import { setMetadaValuesCabinet } from "../../../../../redux/formData/FileData";
import { getDataDocumentId } from "../../../../../redux/formData/FileData";
import { Button } from "primereact/button";
import toast, { Toaster } from "react-hot-toast";
import { Chip } from "primereact/chip";
import { CleaningStateInitial } from "../../../../../redux/states/Name";
import ModalDownload from "../../../../../utilities/ModalDownload";
import { Dropdown } from "primereact/dropdown";

const ChildMessageRenderer = (props) => {
  const dispatch = useDispatch();
  const invokeParentMethod = () => {
    // console.log(props.node.data);
    dispatch(setOpenModalUploadFile(true));
    dispatch(getFileAllDocument(props.node.data.documentId));
    // dispatch(getTypeFileByFolderFolder(props.node.data.folderId));
  };

  return <ButtonModal onClick={invokeParentMethod}>Ver Archivos</ButtonModal>;
};

const TableIndexMeta = () => {
  const dispatch = useDispatch();
  const {
    indexCore,
    metaCore,
    folderCore,
    documentary,
    cabinetCore,
    typeFileCore,
    uploader,
  } = useSelector((store) => store);
  const { documentIdDown } = uploader;
  const { SelectedCabinet } = cabinetCore;
  const { IndexConfig } = indexCore;
  const { DocumentDetail } = documentary;
  const { MetadataCabinet } = metaCore;
  const { FilesFolders, CountFileType } = typeFileCore;
  const { SelectedFolderMeta, SelectedFolder } = folderCore;
  const [cols, setCol] = useState([]);
  const [gridApi, setGridApi] = useState({});
  const [nameValue, setNameValue] = useState([]);
  const [DataCabinet, setDataCabinet] = useState([]);
  const [docu, setDocu] = useState({ id_doc: [] });
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);
  

  const ImagenPreviewMetadata = (props) => {
    const data = [];
    IndexConfig.forEach((index, i) => {
      if (index.dataTypeId == "b737b512-582c-4d55-ac2d-f623a5862982") {
        data.push(i);
      }
    });
    return (
      <ImgContent src={props.node.data.values[data[0]]} alt="sin imagen" />
    );
  };

  useEffect(() => {
    const Meta = [];
    MetadataCabinet?.forEach((meta, i) => {
      DocumentDetail.forEach((doc, i) => {
        if (doc.documentId == meta.documentId) {
          const item = {
            secuentialId: doc.documentSequential,
            documentCreatedAt: doc.documentCreatedAt,
            metadataUpdatedAt: doc.metadataUpdatedAt,
            countFiles: doc.countFiles,
            documentId: doc.documentId,
            values: meta.values,
          };
          Meta.push(item);
        }
      });
    });

    // console.log(DocumentDetail);
    // console.log(MetadataCabinet);

    const FileData = [];
    CountFileType.map((count, i) => {
      const dataObject = count.countFileType.map((file) => file.countFiles);
      const data = {
        documentId: count.documentId,
        countFileType: dataObject,
      };
      FileData.push(data);
    });

    Meta.forEach((cabi, i) => {
      FileData.forEach((file, i) => {
        if (cabi.documentId == file.documentId) {
          Object.assign(cabi, file);
        }
        return cabi;
      });
    });

    setDataCabinet(Meta);
    const Document = [];
    const idFiless = documentIdDown.map((doc, i) =>
      Document.push(documentIdDown[i])
    );
    setDocu({ ...docu, id_doc: Document });
    // console.log(docu);

    IndexConfig.sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      }
      return IndexConfig;
    });
    const DataMeta = [
      {
        headerName: "",
        field: "",
        cellRenderer: ChildMessageCheck,
        pinned: "left",
        filter: false,
        width: 70,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "ID",
        field: "secuentialId",
        pinned: "left",
        width: 80,
        filter: true,
      },
      {
        headerName: "Total De Archivos",
        field: "countFiles",
        pinned: "left",
        width: 100,
        filter: true,
      },
      {
        headerName: "Acciones",
        field: "",
        cellRenderer: ChildMessageRenderer,
        pinned: "left",
        width: 80,
        filter: false,
      },
      {
        headerName: "Creacion",
        field: "documentCreatedAt",
        width: 120,
        filter: true,
      },
      {
        headerName: "Actualizacion",
        field: "metadataUpdatedAt",
        width: 120,
        filter: true,
      },
    ];

    IndexConfig.map((indice, i) => {
      if (indice.dataTypeId == "b737b512-582c-4d55-ac2d-f623a5862982") {
        const headPhoto = {
          headerName: indice.name,
          field: `values.${i}`,
          cellRenderer: ImagenPreviewMetadata,
        };
        DataMeta.push(headPhoto);
      }
      if (indice.dataTypeId != "b737b512-582c-4d55-ac2d-f623a5862982") {
        const head = {
          headerName: indice.name,
          field: `values.${i}`,
        };
        DataMeta.push(head);
      }
    });

    // console.log(CountFileType);

    CountFileType.map((count, i) => {
      if (i == 0) {
        count.countFileType.map((file, i) => {
          const head = {
            headerName: file.fileTypeName,
            field: `countFileType.${i}`,
            hide: true,
          };
          DataMeta.push(head);
        });
      }
    });

    setCol(DataMeta);

    // function generateNumberArray(maxNumber) {
    //   const numberArray = [];
    //   for (let i = 1; i <= maxNumber; i++) {
    //     numberArray.push(i);
    //   }
    //   return numberArray;
    // }

    // const numberArray = generateNumberArray(MetadataCabinet[0]?.totalPages);

    // setNumberPage(numberArray);
  }, [documentIdDown, MetadataCabinet]);

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

  const ChildMessageCheck = (props) => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
      const checkboxes = document.querySelectorAll(
        'input[name="document"]:checked'
      );
      const SelectedDocument = [];
      checkboxes.forEach((checkbox) => {
        SelectedDocument.push(checkbox.value);
      });
      dispatch(getDataDocumentId(SelectedDocument));
    };

    return (
      <input
        name="document"
        type="checkbox"
        value={props.node.data.documentId}
        checked={docu.id_doc.includes(props.node.data.documentId)}
        onChange={handleChange}
      />
    );
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    const selectedRows = gridApi.getSelectedRows();
    // console.log(selectedRows[0].documentId);
    if (selectedRows[0].documentId != "") {
      dispatch(setSelectedDocumentDocu(selectedRows[0].documentId));
      dispatch(setFilterMetadataByDocument(selectedRows[0].documentId));
    }
  };

  const ObterneColumnData = () => {
    const TotalFiles = [];
    gridApi.forEachNodeAfterFilter((node, i) => {
      TotalFiles.push(node.data.countFiles);
    });
    console.log(TotalFiles.length);
    setFiles(TotalFiles);
    // const SumFiles = TotalFiles.reduce((a, b) => a + b, 0);
    // console.log(SumFiles)
    let total = 0;
    TotalFiles.forEach(function (a) {
      total += a;
    });
    // console.log(total);
    setCount(total);
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

  const pagination = true;
  const paginationPageSize = 5000;

  const onFilterTextBoxChanged = () => {
    gridApi.setQuickFilter(document.getElementById("filter-text-box").value);
  };

  const VisibleColumn = () => {
    const FileData = [];
    CountFileType.map((count, i) => {
      const dataObject = count.countFileType.map((file) => file.countFiles);
      const data = {
        documentId: count.documentId,
        countFileType: dataObject,
      };
      FileData.push(data);
    });

    DataCabinet.forEach((cabi, i) => {
      FileData.forEach((file, i) => {
        if (cabi.documentId == file.documentId) {
          Object.assign(cabi, file);
        }
        return cabi;
      });
    });
    setDataCabinet(DataCabinet);

    const Document = [];
    const idFiless = documentIdDown.map((doc, i) =>
      Document.push(documentIdDown[i])
    );
    setDocu({ ...docu, id_doc: Document });
    console.log(docu);

    IndexConfig.sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      }
      return IndexConfig;
    });

    const DataMeta = [
      {
        headerName: "",
        field: "documentId",
        cellRenderer: ChildMessageCheck,
        pinned: "left",
        filter: false,
        width: 70,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "ID",
        field: "secuentialId",
        pinned: "left",
        width: 80,
        filter: true,
      },
      {
        headerName: "Total De Archivos",
        field: "countFiles",
        pinned: "left",
        width: 100,
        filter: true,
      },
      {
        headerName: "Acciones",
        field: "documentId",
        cellRenderer: ChildMessageRenderer,
        pinned: "left",
        width: 80,
        filter: false,
      },
      {
        headerName: "Creacion",
        field: "documentCreatedAt",
        width: 120,
        filter: true,
      },
      {
        headerName: "Actualizacion",
        field: "metadataUpdatedAt",
        width: 120,
        filter: true,
      },
    ];

    IndexConfig.map((indice, i) => {
      const head = {
        headerName: indice.name,
        field: `values.${i}`,
      };
      DataMeta.push(head);
    });

    CountFileType.map((count, i) => {
      if (i == 0) {
        count.countFileType.map((file, i) => {
          const head = {
            headerName: file.fileTypeName,
            field: `countFileType.${i}`,
            hide: false,
          };
          DataMeta.push(head);
        });
      }
    });

    setCol(DataMeta);
  };

  const NotVisibleColumn = () => {
    const FileData = [];
    CountFileType.map((count, i) => {
      const dataObject = count.countFileType.map((file) => file.countFiles);
      const data = {
        documentId: count.documentId,
        countFileType: dataObject,
      };
      FileData.push(data);
    });

    DataCabinet.forEach((cabi, i) => {
      FileData.forEach((file, i) => {
        if (cabi.documentId == file.documentId) {
          Object.assign(cabi, file);
        }
        return cabi;
      });
    });
    setDataCabinet(DataCabinet);

    const Document = [];
    const idFiless = documentIdDown.map((doc, i) =>
      Document.push(documentIdDown[i])
    );
    setDocu({ ...docu, id_doc: Document });
    console.log(docu);

    IndexConfig.sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      }
      return IndexConfig;
    });

    const DataMeta = [
      {
        headerName: "",
        field: "documentId",
        cellRenderer: ChildMessageCheck,
        pinned: "left",
        filter: false,
        width: 70,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "ID",
        field: "secuentialId",
        pinned: "left",
        width: 80,
        filter: true,
      },
      {
        headerName: "Total De Archivos",
        field: "countFiles",
        pinned: "left",
        width: 100,
        filter: true,
      },
      {
        headerName: "Acciones",
        field: "documentId",
        cellRenderer: ChildMessageRenderer,
        pinned: "left",
        width: 80,
        filter: false,
      },
      {
        headerName: "Creacion",
        field: "documentCreatedAt",
        width: 120,
        filter: true,
      },
      {
        headerName: "Actualizacion",
        field: "metadataUpdatedAt",
        width: 120,
        filter: true,
      },
    ];

    IndexConfig.map((indice, i) => {
      const head = {
        headerName: indice.name,
        field: `values.${i}`,
      };
      DataMeta.push(head);
    });

    CountFileType.map((count, i) => {
      if (i == 0) {
        count.countFileType.map((file, i) => {
          const head = {
            headerName: file.fileTypeName,
            field: `countFileType.${i}`,
            hide: true,
          };
          DataMeta.push(head);
        });
      }
    });

    setCol(DataMeta);
  };

  const changeOptionFilter = (value) => {
    setSelectedFilter(value);
  };

  const handleChangeRecargue = () => {
    setSelectedFilter(null);
    if (SelectedCabinet?.viewMode == false) {
      dispatch(getMetadataByCabinet(SelectedCabinet?.id));
      // dispatch(
      //   setCountFileTypeByDocument(
      //     SelectedFolderMeta?.id || SelectedFolder?.id,
      //     value
      //   )
      // );
      // dispatch(
      //   setDetailByFolderDocument(
      //     SelectedFolderMeta?.id || SelectedFolder?.id,
      //     value
      //   )
      // );
    }
    if (SelectedCabinet?.viewMode == true) {
      dispatch(
        getMetadataByCabinetFilter(SelectedFolderMeta?.id || SelectedFolder?.id)
      );
      // dispatch(
      //   setCountFileTypeByDocument(
      //     SelectedFolderMeta?.id || SelectedFolder?.id,
      //     value
      //   )
      // );
      // dispatch(
      //   setDetailByFolderDocument(
      //     SelectedFolderMeta?.id || SelectedFolder?.id,
      //     value
      //   )
      // );
    }
  };

  const handleChangeDay = (event) => {
    const Date = event.target.value;
    const FechaFormat = Date.split("-");
    const FechaActual = `${FechaFormat[2]}-${FechaFormat[1]}-${FechaFormat[0]}`;
    dispatch(
      setMetadataByDateByFolderId(
        SelectedFolderMeta?.id || SelectedFolder?.id,
        FechaActual
      )
    );
  };

  const changeOptionMonth = (month) => {
    dispatch(
      setMetadataByDateByFolderId(
        SelectedFolderMeta?.id || SelectedFolder?.id,
        month
      )
    );
  };

  const changeOptionYear = (year) => {
    dispatch(
      setMetadataByDateByFolderId(
        SelectedFolderMeta?.id || SelectedFolder?.id,
        year
      )
    );
  };

  const SectionFilter = [
    {
      name: "Dia",
    },
    {
      name: "Mes",
    },
    {
      name: "Año",
    },
  ];

  return (
    <ContainerTable>
      <HeaderMantent>  

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

        <SpaceLine />
        <SpaceLine />
        <Button
          type="button"
          title="PORCENTAJE DE REGISTROS"
          icon="pi pi-refresh"
          className="p-button-info"
          onClick={() => ObterneColumnData()}
        />

        <SpaceLine />
        <SpaceLine />

        {FilesFolders != "" && visible == true ? (
          <>
            <Button
              type="button"
              title="VISIBILIDAD ARCHIVOS"
              icon="pi pi-sort-alt"
              className="p-button-info"
              onClick={() => {
                VisibleColumn(), setVisible(!visible);
              }}
            />

            <SpaceLine />
            <SpaceLine />
          </>
        ) : (
          <></>
        )}

        {FilesFolders != "" && visible == false ? (
          <>
            <Button
              type="button"
              title="VISIBILIDAD ARCHIVOS"
              icon="pi pi-sort-alt-slash"
              className="p-button-info"
              onClick={() => {
                NotVisibleColumn(), setVisible(!visible);
              }}
            />

            <SpaceLine />
            <SpaceLine />
          </>
        ) : (
          <></>
        )}
        <Chip label={`Registros: ${files.length}`} />
        <SpaceLine />
        {/* <SpaceLine /> */}

        <Chip label={`Archivos: ${count}`} />

        <SpaceLine />
        {/* <SpaceLine /> */}

        <InputSearch
          type="text"
          id="filter-text-box"
          placeholder="Buscar..."
          onInput={onFilterTextBoxChanged}
        />

        <SpaceLine />
        <SpaceLine />
        <div className="card flex justify-content-center">
            <Dropdown
              value={selectedFilter}
              onChange={(e) => changeOptionFilter(e.value)}
              options={SectionFilter}
              optionLabel="name"
              placeholder="Seleccione Filtro"
              className="w-full md:w-8rem"
            />
          </div>

        <SpaceLine />

        {selectedFilter?.name == "Dia" && (
          <>
            <Calendar
              type="date"
              onChange={(e) => {
                handleChangeDay(e);
              }}
              required
            />

            <SpaceLine />
            <Button
              type="button"
              title="SIN FILTRO"
              icon="pi pi-filter-slash"
              className="p-button-info"
              onClick={(e) => {
                handleChangeRecargue();
              }}
            />
          </>
        )}

        {selectedFilter?.name == "Mes" && (
          <>
            <Selected onChange={(e) => changeOptionMonth(e.target.value)}>
              <option hidden>Seleccione</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </Selected>
            <SpaceLine />
            <Button
              type="button"
              title="SIN FILTRO"
              icon="pi pi-filter-slash"
              className="p-button-info"
              onClick={(e) => {
                handleChangeRecargue();
              }}
            />
          </>
        )}

        {selectedFilter?.name == "Año" && (
          <>
            <Selected onChange={(e) => changeOptionYear(e.target.value)}>
              <option hidden>Seleccione</option>
              <option value="2022">Enero</option>
              <option value="2023">Febrero</option>
              <option value="2024">Marzo</option>
              <option value="2025">Abril</option>
              <option value="2026">Mayo</option>
            </Selected>

            <SpaceLine />
            <Button
              type="button"
              title="SIN FILTRO"
              icon="pi pi-filter-slash"
              className="p-button-info"
              onClick={(e) => {
                handleChangeRecargue();
              }}
            />
          </>
        )}
      </HeaderMantent>
      <div
        id="myGrid"
        style={{ width: "100%", height: "100%" }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          onGridReady={onGridReady}
          rowData={DataCabinet}
          columnDefs={cols}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection={"single"}
          onRowClicked={onSelectionChanged}
          loadingCellRendererParams={loadingCellRendererParams}
          cacheQuickFilter={true}
        ></AgGridReact>

        <FilesPreview />
        <DownLoadMasive />
        <ModalDownload />
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

const InputSearch = styled.input`
  outline: none;
  width: 190px;
  border: none;
  border-bottom: 1px solid #096afc;
`;

const ImgContent = styled.img`
  width: 40px;
  height: 40px;
`;

const Selected = styled.select`
  outline: none;
  border: 1px solid #f68a20;
  width: 100px;
  text-align: center;
  color: #f68a20;
  border-radius: 13px;
`;

const Calendar = styled.input`
  width: 140px;
  height: 45px;
  font-size: 15px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  margin: 0 0.5rem 0 0;
  border-radius: 10px;
  border: 1px solid #d1d3d6;
  color: #4c607f;
`;
