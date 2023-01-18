import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenModalDeleteFile,
  setOpenModalUploaderUnirFile,
  setOpenModalUploadFile,
  setOpenModalUploadUpdateFile,
} from "../../../../../../../redux/states/ActionDocumentary";
import { setSelectedFileDocumentary } from "../../../../../../../redux/states/Files";
import { getFileTypeFileDataNewCore } from "../../../../../../../redux/formData/FilesData";
import { setGetNameTypeFileNameDocu } from "../../../../../../../redux/formData/FileData";
import { DeleteIconFile, EditIconFile } from "./Icons";
import "./Styles/modal.css";
import "./Styles/ModalUpload.css";
import FilesCreated from "../FilesCreated";
import FilesUpdate from "../FilesUpdate";
import FilesDelete from "../FilesDelete";
import { setFolderChildCore } from "../../../../../../../redux/states/Folder";

const useStyless = makeStyles((theme) => ({
  FileUpload: {
    position: "absolute",
    width: "600px",
    "@media (max-width: 767px)": {
      width: "360px",
    },
    height: "500px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    borderRadius: "13px",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    transform: "translate(-50%,-50%)",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const FilesPreview = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalDocumentary, typeFileCore, filesCore } = useSelector(
    (store) => store
  );
  const { FileUpload } = modalDocumentary;
  const { FilesFolders } = typeFileCore;
  const { files, SelectedFile } = filesCore;
  const [input, setInput] = useState({ ids_diets: [] });
  const [cargados, setCargados] = useState(true);
  const [pendiente, setPendientes] = useState(false);
  const [Select, setFiles] = useState([]);

  useEffect(() => {
    const Files = [];
    const idFiless = files.map((ind, i) => Files.push(files[i].fileTypeId));
    setInput({ ...input, ids_diets: Files });
    // console.log(input);

    const FileEnablig = [];
    files.map((file, i) => {
      FilesFolders.map((type, i) => {
        if (file.fileTypeId == type.fileTypeId) {
          FileEnablig.push(file);
        }
      });
    });
    setFiles(FileEnablig);
  }, [files]);

  function handlerDiets(e) {
    const checked = e.target.checked;
    const value = e.target.value;

    const new_ids_diets = checked
      ? [...input.ids_diets, value]
      : [...input.ids_diets.filter((id) => id !== value)];
    // console.log(new_ids_diets);
    //bloquiar que pueda desabilitar y activar check
    // setInput({ ...input, ids_diets: new_ids_diets });
  }

  const ActiveCargados = () => {
    setCargados(true);
    setPendientes(false);
  };

  const ActivePendientes = () => {
    setCargados(false);
    setPendientes(true);
  };

  const OpenModalFile = () => {
    dispatch(setOpenModalUploaderUnirFile(true));
  };

  const OpenModalUpdateFile = (id) => {
    dispatch(setOpenModalUploadUpdateFile(true));
    dispatch(setSelectedFileDocumentary(id));
  };

  const OpenModalDeleteFile = (id) => {
    dispatch(setOpenModalDeleteFile(true));
    dispatch(setSelectedFileDocumentary(id));
  };

  const Uploader = (
    <div className={styless.FileUpload}>
      <div className="headersContainer">
        <button
          className={cargados ? "ButtonChange-on" : "ButtonChange-off"}
          onClick={() => ActiveCargados()}
        >
          Archivos Cargados
        </button>
        <button
          className={pendiente ? "ButtonChange-on" : "ButtonChange-off"}
          onClick={() => ActivePendientes()}
        >
          Archivos Pendientes
        </button>
      </div>
      {cargados && (
        <TableContainer>
          <TableRaid>
            <table>
              <tr>
                <THN>Tipo</THN>
                <TH>Tipo de archivo</TH>
                <TH>Nombre</TH>
                <THN>Editar</THN>
                <THN>Eliminar</THN>
              </tr>

              {Select ? (
                Select.map(
                  (
                    {
                      id,
                      name,
                      description,
                      file,
                      fileTypeId,
                      documentId,
                      fileTypeName,
                      extension,
                    },
                    index
                  ) => (
                    <tr key={id}>
                      <TD1>{extension}</TD1>

                      <TD1>{fileTypeName}</TD1>
                      <TD1>{name}</TD1>
                      <TD1 onClick={() => OpenModalUpdateFile(id)}>
                        <EditIconFile x={25} y={25} />
                      </TD1>
                      <TD1 onClick={() => OpenModalDeleteFile(id)}>
                        <DeleteIconFile x={25} y={25} />
                      </TD1>
                    </tr>
                  )
                )
              ) : (
                <></>
              )}
            </table>

            {SelectedFile && (
              <FilesUpdate
                id={SelectedFile?.id}
                name={SelectedFile?.name}
                description={SelectedFile?.description}
                file={SelectedFile?.file}
                fileTypeId={SelectedFile?.fileTypeId}
                documentId={SelectedFile?.documentId}
                fileTypeName={SelectedFile?.fileTypeName}
              />
            )}

            {SelectedFile && (
              <FilesDelete
                id={SelectedFile?.id}
                name={SelectedFile?.name}
                documentId={SelectedFile?.documentId}
              />
            )}
          </TableRaid>
        </TableContainer>
      )}

      {pendiente && (
        <TableContainer>
          <TableRaid>
            <table>
              <TH2>Cargados</TH2>
              <TH2>Tipo de documento</TH2>
              <TH2>Acciones</TH2>

              {FilesFolders ? (
                FilesFolders.map(({ fileTypeId, fileTypeName }, index) => (
                  <tr>
                    <TD1>
                      <input
                        type="checkbox"
                        checked={input.ids_diets.includes(fileTypeId)}
                        value={fileTypeId}
                        name={fileTypeName}
                        onChange={handlerDiets}
                      />
                    </TD1>
                    <TD1>
                      <span key={fileTypeId}>{fileTypeName}</span>
                    </TD1>
                    <TD1>
                      <button
                        className="Agg-File"
                        onClick={() => {
                          OpenModalFile(),
                            dispatch(getFileTypeFileDataNewCore(fileTypeId)),
                            dispatch(setGetNameTypeFileNameDocu(fileTypeName));
                        }}
                      >
                        Agregar
                      </button>
                      <FilesCreated />
                    </TD1>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </table>
          </TableRaid>
        </TableContainer>
      )}
    </div>
  );

  const OpenModalUploaderDocu = () => {
    dispatch(setOpenModalUploadFile(false));
    setCargados(true);
    setPendientes(false);
  };

  return (
    <Modal open={FileUpload} onClose={OpenModalUploaderDocu}>
      {Uploader}
    </Modal>
  );
};

export default FilesPreview;

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableRaid = styled.div`
  width: 100%;
  height: 370px;
  overflow-y: scroll;
`;

const THN = styled.th`
  width: 6rem;
  height: 2rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const TH2 = styled.th`
  width: 9rem;
  height: 2.1rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const TH = styled.th`
  width: 4rem;
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
  border-radius: 13px;
`;
