import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalUploaderUnirFile } from "../../../../../../../redux/states/ActionDocumentary";
import { StyleDragArea } from "../../../../../../../Styles/DragArea";
import "../FilesPreview/styles/modal.css";
import "../FilesPreview/styles/ModalUpload.css";
import {
  getNameFileDataNewCore,
  getDescriptionFileDataNewCore,
  getFileFileDataNewCore,
  getDocumentFileDataNewCore,
  clearFileDataNewCore,
} from "../../../../../../../redux/formData/FilesData";
import { sendFileDocumentaryDocu } from "../../../../../../../redux/formData/FileData";
import { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "@material-ui/core";

const useStyless = makeStyles((theme) => ({
  FileUploadUnit: {
    position: "absolute",
    width: "400px",
    height: "470px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "13px",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const FileUploaderCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();

  const { modalDocumentary, filesData, documentary, uploader } = useSelector(
    (store) => store
  );
  const { NameFile } = uploader;
  const { SelectedDocument } = documentary;
  const { FileUploadUnit } = modalDocumentary;
  const { name, description } = filesData;
  const [fileCharged, setFileCharged] = useState({});
  const [value, setValue] = useState(false);

  useEffect(() => {
    dispatch(getDocumentFileDataNewCore(SelectedDocument?.id));
  }, [FileUploadUnit]);

  const setFile = (e) => {
    const file = e.target.files[0];
    dispatch(getFileFileDataNewCore(file));
    setValue(true);
  };

  const SaveFileDocumentary = (e) => {
    e.preventDefault();
    const formFile = new FormData();
    filesData.id && formFile.append("Id", filesData.id);
    filesData.name && formFile.append("Name", filesData.name);
    filesData.description &&
      formFile.append("Description", filesData.description);
    filesData.file && formFile.append("File", filesData.file);
    filesData.fileTypeId && formFile.append("FileTypeId", filesData.fileTypeId);
    filesData.documentId && formFile.append("DocumentId", filesData.documentId);
    dispatch(sendFileDocumentaryDocu(formFile, filesData.documentId));
    OpenModalUploaderDocu();
  };

  const Uploader = (
    <div className={styless.FileUploadUnit}>
      <form onSubmit={SaveFileDocumentary}>
        <Tooltip title={NameFile}>
          <Title>
            <div>
              <strong>
                <span>Subir {NameFile}</span>
              </strong>
            </div>
          </Title>
        </Tooltip>

        <TextField
          value={name}
          type="text"
          className={styless.textfield}
          label="Nombre"
          onChange={(e) => dispatch(getNameFileDataNewCore(e.target.value))}
          inputProps={{ maxLength: 190 }}
        />

        <br />

        <TextField
          value={description}
          type="text"
          className={styless.textfield}
          label="Descripcion"
          onChange={(e) =>
            dispatch(getDescriptionFileDataNewCore(e.target.value))
          }
          inputProps={{ maxLength: 190 }}
        />
        <br />
        <br />
        <label>
          <input type="checkbox" checked={value} /> Archivo Cargado
        </label>
        <div className="ContentFile">
          <br />
          <StyleDragArea>
            <div className="image-upload-wrap">
              <input
                type="file"
                className="file-upload-input"
                accept=".pdf, .doc, .rar, .txt"
                onInput={(e) => {
                  setFile(e), setFileCharged(e.target.file[0]);
                }}
              />
            </div>
          </StyleDragArea>
        </div>
        <div className="ContainerFluid">
          <button className="can" onClick={() => OpenModalUploaderDocu()}>
            CANCEL
          </button>
          <button className="enviar">EMPEZAR A CARGAR</button>
        </div>
      </form>
    </div>
  );

  const OpenModalUploaderDocu = () => {
    dispatch(setOpenModalUploaderUnirFile(false));
    dispatch(clearFileDataNewCore());
    setValue(false);
  };

  return (
    <Modal open={FileUploadUnit} onClose={OpenModalUploaderDocu}>
      {Uploader}
    </Modal>
  );
};

export default FileUploaderCreated;

const Title = styled.div`
  div {
    width: 310px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    align-items: center;
    color: var(--primaryColor);
  }

  span {
    text-transform: uppercase;
    font-size: 21px;
  }
  strong {
    float: center;
  }
`;
