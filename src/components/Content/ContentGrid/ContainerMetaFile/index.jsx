import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import CeldaMetaFile from "../ContainerMetaFile/CeldaMetaFile";
import { setOpenModalDownloadMasive } from "../../../../redux/states/ActionDocumentary";
import {
  getDataDocumentId,
  getFileTypeId,
} from "../../../../redux/formData/FileData";
import { setSelectedDocumentDocu } from "../../../../redux/states/Document";
import { setChangeSelectView } from "../../../../redux/states/View";
import { Button } from "primereact/button";
import DownLoadMasive from "../ContainerDocFile/ModalesDocument/DownloadMasive/DownloadMasive";
import ModalDownload from "../../../../utilities/ModalDownload";

const ContainerMetaFile = () => {
  const dispatch = useDispatch();
  const { filesCore, viewCore, metaCore, typeFileCore } = useSelector(
    (store) => store
  );

  const { SearchFiles, isLoadingFilesSearch } = filesCore;
  const { TypeFile } = typeFileCore;
  const { selectedView } = viewCore;
  const { MetadataCabinet } = metaCore;
  const [metaData, setMetaData] = useState([]);
  const [term, setTerm] = useState(null);
  const [document, setDocument] = useState("");

  useEffect(() => {
    const Metadata = [];
    MetadataCabinet.map((meta) => {
      SearchFiles.map((file) => {
        if (meta.documentId == file.documentId) {
          Metadata.push(meta);
        }
      });
    });

    const unicos = Metadata.filter((valor, indice) => {
      return Metadata.indexOf(valor) === indice;
    });

    unicos.map((sear) => {
      sear.file = [];
      SearchFiles.map((files, i) => {
        if (sear.documentId == files.documentId) {
          if (sear.file) {
            if (!sear.file.find((file) => file.id == files.id)) {
              sear.file.push(files);
            }
          } else {
            sear.file = [files];
          }
        }
      });
    });

    if (unicos != "") {
      dispatch(setSelectedDocumentDocu(unicos[0].documentId));
    }
    setMetaData(unicos);
  }, [SearchFiles]);

  useEffect(() => {
    if (term != 0) {
      metaData.forEach((meta) => {
        meta.values.map((val, i) => {
          if (val.toLowerCase().includes(term.toLowerCase())) {
            setDocument(meta.documentId);
          }
        });
      });
    }

    if (term == 0) {
      setDocument("");
    }
  }, [term]);

  useEffect(() => {
    const Documents = [];
    if (metaData) {
      metaData.forEach((meta, i) => {
        Documents.push(meta.documentId);
      });
    }

    const FileType = [];
    if (SearchFiles) {
      TypeFile.forEach((type) => {
        SearchFiles.forEach((file) => {
          if (file.fileTypeId == type.id) {
            FileType.push(file.fileTypeId);
          }
        });
      });
    }

    const Types = FileType.filter((valor, indice) => {
      return FileType.indexOf(valor) === indice;
    });

    dispatch(getDataDocumentId(Documents));
    dispatch(getFileTypeId(Types));
  }, [metaData]);

  const FilterDataSearching = (value) => {
    setTerm(value);
  };

  function searchingTerm(term) {
    return function (x) {
      return x.documentId.includes(term) || !term;
    };
  }

  return (
    <DocumentContainer>
      {SearchFiles != "" ? (
        <>
          <HeaderNav>
            <InputSearch
              placeholder="  Buscar"
              onChange={(e) => FilterDataSearching(e.target.value)}
            />

            <SpaceLine />
            <SpaceLine />

            <Button
              type="button"
              icon="pi pi-download"
              className="p-button-rounded p-button-info"
              title="DESCARGA MASIVA"
              onClick={() => dispatch(setOpenModalDownloadMasive(true))}
            />

            <SpaceLine />
            <SpaceLine />

            <InputCount
              value={`Total De Registros: ${metaData.length}`}
              disabled
            />
          </HeaderNav>
          <ContainerFiles>
            {metaData ? (
              metaData
                .filter(searchingTerm(document))
                .map(
                  (
                    { folderId, documentId, values, documentSequential, file },
                    index
                  ) => (
                    <CeldaMetaFile
                      key={index}
                      index={documentSequential}
                      documentId={documentId}
                      folderId={folderId}
                      values={values}
                      file={file}
                    />
                  )
                )
            ) : (
              <>Sin Coincidencias</>
            )}
          </ContainerFiles>
        </>
      ) : (
        <ContainerFiles>
          <ContainerNotFiles>
            <div>
              <span>Sin Coindicencias ...</span>
              <button onClick={() => dispatch(setChangeSelectView("folder"))}>
                Regresar
              </button>
            </div>
          </ContainerNotFiles>
        </ContainerFiles>
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

      <DownLoadMasive />
      <ModalDownload />
    </DocumentContainer>
  );
};

export default ContainerMetaFile;

const DocumentContainer = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const HeaderNav = styled.div`
  width: 99%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  /* background-color: red; */
`;

const InputSearch = styled.input`
  width: 300px;
  height: 43px;
  outline: none;
  border-radius: 13px;
  border: 1px solid #c4c4c4;
`;

const InputCount = styled.input`
  width: 140px;
  height: 43px;
  outline: none;
  border-radius: 13px;
  border: 1px solid #c4c4c4;
  display: flex;
  text-align: center;
  font-weight: bold;
`;

const ContainerFiles = styled.div`
  width: 99%;
  height: 420px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContainerNotFiles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  span {
    color: var(--primaryColor);
    font-size: 34px;
  }

  button {
    width: 80px;
    height: 30px;
    border-radius: 13px;
    border: none;
    outline: none;
    background-color: var(--primaryColor);
    color: #fff;
    cursor: pointer;
  }
`;

const SpaceLine = styled.div`
  margin: 0 0.5rem 0 0;
`;
