import { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalDownloadMasive } from "../../../../../../redux/states/ActionDocumentary";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getDataDocumentId,
  getFileTypeId,
  getDataIndexId,
  setClearDataDocumentId,
  setClearDataIndexId,
  setClearDataFileTypeId,
  getDataDownloadMetaFiles,
} from "../../../../../../redux/formData/FileData";

const useStyless = makeStyles((theme) => ({
  modalDownload: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "13px",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const DownLoadMasive = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const {
    modalDocumentary,
    indexCore,
    typeFileCore,
    uploader,
    cabinetCore,
    metaCore,
  } = useSelector((store) => store);
  const { documentIdDown, indexesDown, fileType, MetaValueDocu } = uploader;
  const { SelectedCabinet } = cabinetCore;
  const { modalDownload } = modalDocumentary;
  const { IndexConfig } = indexCore;
  const { FilesCabinets } = typeFileCore;
  const { MetadataCabinet } = metaCore;
  const [Docum, setDocum] = useState(true);
  const [Index, setIndex] = useState(false);
  const [typefile, setTypefile] = useState(false);
  const [docu, setDocu] = useState({ id_doc: [] });
  const [inde, setInde] = useState({ id_ind: [] });
  const [fil, setFil] = useState({ id_fil: [] });

  useEffect(() => {
    const Document = [];
    const idFiless = documentIdDown.map((doc, i) =>
      Document.push(documentIdDown[i])
    );
    setDocu({ ...docu, id_doc: Document });
    console.log(docu);
    const Indexes = [];
    const idIndexs = indexesDown.map((ind, i) => Indexes.push(indexesDown[i]));
    setInde({ ...inde, id_ind: Indexes });
    const fileId = [];
    const idFiles = fileType.map((fil, i) => fileId.push(fileType[i]));
    setFil({ ...fil, id_fil: fileId });
  }, [documentIdDown, indexesDown, fileType]);

  const ActiveDocum = () => {
    setDocum(true);
    setIndex(false);
    setTypefile(false);
  };

  const ActiveIndex = () => {
    setDocum(false);
    setIndex(true);
    setTypefile(false);
  };

  const ActiveTypefile = () => {
    setDocum(false);
    setIndex(false);
    setTypefile(true);
  };

  const ObtenerSelected = () => {
    const checkboxes = document.querySelectorAll(
      'input[name="document"]:checked'
    );
    const SelectedDocument = [];
    checkboxes.forEach((checkbox) => {
      SelectedDocument.push(checkbox.value);
    });
    dispatch(getDataDocumentId(SelectedDocument));
  };

  const ObtenerSelectedIndex = () => {
    const checkboxes = document.querySelectorAll(
      'input[name="indexes"]:checked'
    );
    const SelectedIndex = [];
    checkboxes.forEach((checkbox) => {
      SelectedIndex.push(checkbox.value);
    });
    dispatch(getDataIndexId(SelectedIndex));
  };

  const ObtenerSelectedFile = () => {
    const checkboxes = document.querySelectorAll(
      'input[name="filestype"]:checked'
    );
    const SelectedFiles = [];
    checkboxes.forEach((checkbox) => {
      SelectedFiles.push(checkbox.value);
    });
    dispatch(getFileTypeId(SelectedFiles));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const DownData = {
      cabinetId: SelectedCabinet?.id,
      folderId: null,
      documentsId: documentIdDown,
      fileTypesId: fileType,
      indexesId: indexesDown,
    };
    console.log(DownData);
    dispatch(getDataDownloadMetaFiles(DownData));
    OpenModalDownloadMasive();
  };

  const documentNew = (
    <div className={styless.modalDownload}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Configuracion Exportar</TitleModal>
        </div>
        <br />
        <ContainerHeader>
          <button
            onClick={() => ActiveDocum()}
            className={Docum ? "ButtonChange-on" : "ButtonChange-off"}
            type="button"
          >
            Documentos
          </button>
          <button
            onClick={() => ActiveIndex()}
            className={Index ? "ButtonChange-on" : "ButtonChange-off"}
            type="button"
          >
            Indices
          </button>
          <button
            onClick={() => ActiveTypefile()}
            className={typefile ? "ButtonChange-on" : "ButtonChange-off"}
            type="button"
          >
            Tipo De Archivo
          </button>
        </ContainerHeader>
        
        <ContainerTable>
          {Docum && (
            <ContainerIndex>
              <ContainerNumber>
                <TitleDown>N</TitleDown>
              </ContainerNumber>
              {MetaValueDocu ? (
                MetaValueDocu.map(({ docum }, index) => (
                  <ContainerNumber>
                    <input
                      className="InputCheck"
                      type="checkbox"
                      name="document"
                      checked={docu.id_doc.includes(docum)}
                      value={docum}
                      onChange={() => ObtenerSelected()}
                    />
                  </ContainerNumber>
                ))
              ) : (
                <></>
              )}
            </ContainerIndex>
          )}

          {Docum && (
            <ContainerSecond>
              <CeldaTable>
                <TitleDown>METADATA</TitleDown>
              </CeldaTable>
              {MetaValueDocu ? (
                MetaValueDocu.map(({ cod }, index) =>
                    <CeldaTable>
                      <span>{cod}</span>
                    </CeldaTable>
                )
              ) : (
                <></>
              )}
            </ContainerSecond>
          )}

          {Index && (
            <ContainerIndex>
              <ContainerNumber>
                <TitleDown>N</TitleDown>
              </ContainerNumber>
              {IndexConfig ? (
                IndexConfig.map(({ id }, index) => (
                  <ContainerNumber>
                    <input
                      className="InputCheck"
                      type="checkbox"
                      name="indexes"
                      value={id}
                      checked={inde.id_ind.includes(id)}
                      onChange={() => ObtenerSelectedIndex()}
                    />
                  </ContainerNumber>
                ))
              ) : (
                <></>
              )}
            </ContainerIndex>
          )}

          {Index && (
            <ContainerSecond>
              <CeldaTable>
                <TitleDown>INDICES</TitleDown>
              </CeldaTable>
              {IndexConfig ? (
                IndexConfig.map(({ name }, index) => (
                  <CeldaTable>
                    <span>{name}</span>
                  </CeldaTable>
                ))
              ) : (
                <></>
              )}
            </ContainerSecond>
          )}

          {typefile && (
            <ContainerIndex>
              <ContainerNumber>
                <TitleDown>N</TitleDown>
              </ContainerNumber>
              {FilesCabinets ? (
                FilesCabinets.map(({ fileTypeId }, index) => (
                  <ContainerNumber>
                    <input
                      className="InputCheck"
                      type="checkbox"
                      name="filestype"
                      value={fileTypeId}
                      checked={fil.id_fil.includes(fileTypeId)}
                      onChange={() => ObtenerSelectedFile()}
                    />
                  </ContainerNumber>
                ))
              ) : (
                <></>
              )}
            </ContainerIndex>
          )}

          {typefile && (
            <ContainerSecond>
              <CeldaTable>
                <TitleDown>Tipo de Archivos</TitleDown>
              </CeldaTable>
              {FilesCabinets ? (
                FilesCabinets.map(({ fileTypeName }, index) => (
                  <CeldaTable>
                    <span>{fileTypeName}</span>
                  </CeldaTable>
                ))
              ) : (
                <></>
              )}
            </ContainerSecond>
          )}
        </ContainerTable>

        <br />
        <div align="right">
          {typefile && <SaveButton>Descargar</SaveButton>}
          <CancelButton onClick={() => OpenModalDownloadMasive()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalDownloadMasive = () => {
    dispatch(setOpenModalDownloadMasive(false));
    dispatch(setClearDataDocumentId());
    dispatch(setClearDataIndexId());
    dispatch(setClearDataFileTypeId());
    setDocum(true);
    setIndex(false);
    setTypefile(false);
  };

  return (
    <div className={styless.container}>
      <Modal open={modalDownload} onClose={OpenModalDownloadMasive}>
        {documentNew}
      </Modal>
    </div>
  );
};

export default DownLoadMasive;

const ContainerTable = styled.div`
  width: 100%;
  height: 260px;
  overflow-y: scroll;
  display: flex;
  margin: 1rem 0 0 0;
`;

const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
`;

const ContainerNumber = styled.div`
  border: 1px solid #c4c4c4;
  height: 2.4rem;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const ContainerIndex = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const TitleDown = styled.span`
  color: #f68a20;
`;

const ContainerSecond = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const CeldaTable = styled.div`
  border: 1px solid #c4c4c4;
  height: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: initial;
  padding: 0.2rem;
  font-size: .9rem;
`;
