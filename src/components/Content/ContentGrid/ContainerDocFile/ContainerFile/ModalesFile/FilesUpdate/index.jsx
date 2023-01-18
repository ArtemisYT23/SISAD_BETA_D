import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalUploadUpdateFile } from "../../../../../../../redux/states/ActionDocumentary";
import "../FilesPreview/styles/modalIndex.css";
import { Selected } from "../../../../../../../Styles/ModalesStyles/modalStyle";
import {
  setGetIdFileDocu,
  setGetDescriptionFileDocu,
  setGetNameFileDocu,
  setGetFileFileDocu,
  setGetFileTypeFileDocu,
  setDocumentFileDocuUpdate,
  updateFileDocumentaryDocu,
} from "../../../../../../../redux/formData/FileData";

const useStyless = makeStyles((theme) => ({
  FileUpdate: {
    position: "absolute",
    width: "600px",
    height: "450px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    overflowY: "scroll",
    borderRadius: "13px",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    }
  },
  textfield: {
    width: "90%",
  },
  container: {
    textAlign: "center",
  },
}));

const FileUploaderUpdate = ({
  id,
  name,
  description,
  file,
  fileTypeId,
  documentId,
  fileTypeName,
}) => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalDocumentary, filesCore, typeFileCore, uploader } = useSelector(
    (store) => store
  );
  const { FileUpdate } = modalDocumentary;
  const { SelectedFile } = filesCore;
  const { FilesFolders } = typeFileCore;
  const { Name, Description } = uploader;

  useEffect(() => {
    dispatch(setGetIdFileDocu(SelectedFile?.id));
    dispatch(setGetNameFileDocu(SelectedFile?.name));
    dispatch(setGetDescriptionFileDocu(SelectedFile?.description));
    dispatch(setGetFileTypeFileDocu(SelectedFile?.fileTypeId));
    dispatch(setDocumentFileDocuUpdate(SelectedFile?.documentId));
  }, [FileUpdate]);

  const setFile = (e) => {
    const file = e.target.files[0];
    dispatch(setGetFileFileDocu(file));
  };

  const UpdateFileDocumentary = (e) => {
    e.preventDefault();
    const formFile = new FormData();
    uploader.idSelected && formFile.append("Id", uploader.idSelected);
    uploader.Name && formFile.append("Name", uploader.Name);
    uploader.Description &&
      formFile.append("Description", uploader.Description);
    uploader.File && formFile.append("File", uploader.File);
    uploader.FileTypeId && formFile.append("FileTypeId", uploader.FileTypeId);
    uploader.DocumentIdUpdate &&
      formFile.append("DocumentId", uploader.DocumentIdUpdate);
    dispatch(
      updateFileDocumentaryDocu(
        uploader.idSelected,
        formFile,
        uploader.DocumentIdUpdate
      )
    );
    OpenModalUploaderDocu();
  };

  const UpdateFile = (
    <div className={styless.FileUpdate}>
      <h1 className="titles">Actualizar {fileTypeName} </h1>
      <div className="ContentDataMeta">
        <div className="ContainerFileUpdate">
          <form onSubmit={UpdateFileDocumentary}>
            <TextField
              type="text"
              className={styless.textfield}
              label="Nombre"
              value={Name}
              onChange={(e) => dispatch(setGetNameFileDocu(e.target.value))}
            />
            <br />
            <br />
            <TextField
              type="text"
              className={styless.textfield}
              label="Descripcion"
              value={Description}
              onChange={(e) =>
                dispatch(setGetDescriptionFileDocu(e.target.value))
              }
            />
            <br />
            <br />
            <label className="Name">Tipo de archivo</label>
            <Selected
              className="Selected"
              onChange={(e) => dispatch(setGetFileTypeFileDocu(e.target.value))}
            >
              <option hidden>{fileTypeName}</option>
              {FilesFolders ? (
                FilesFolders.map(({ fileTypeId, fileTypeName }, index) => (
                  <option key={fileTypeId} value={fileTypeId}>
                    {fileTypeName}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Selected>
            <br />
            <br />
            <input
              type="file"
              className="file-upload-input"
              accept=".pdf, .doc, .rar, .txt"
              onInput={(e) => setFile(e)}
            />
            <br />
            <br />

            <div className="ContainerFluid">
              <button className="can" onClick={() => OpenModalUploaderDocu()}>
                CANCEL
              </button>
              <button className="enviar">ACTUALIZAR</button>
            </div>
          </form>
        </div>
        <div className="PreviewUpdateFile">
          <iframe className="PreviewUpdate" src={file} frameBorder={10} />
        </div>
      </div>
    </div>
  );

  const OpenModalUploaderDocu = () => {
    dispatch(setOpenModalUploadUpdateFile(false));
  };

  return (
    <Modal open={FileUpdate} onClose={OpenModalUploaderDocu}>
      {UpdateFile}
    </Modal>
  );
};

export default FileUploaderUpdate;
