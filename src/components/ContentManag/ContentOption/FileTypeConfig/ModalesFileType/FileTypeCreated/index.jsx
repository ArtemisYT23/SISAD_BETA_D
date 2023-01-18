import { useDispatch, useSelector } from "react-redux";
import { TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalTypeFileCreated } from "../../../../../../redux/states/ActionConfig";
import { CreatedTypeFileConfig } from "../../../../../../redux/states/FileType";
import {
  getNameFileTypeNew,
  getDescriptionFileTypeNew,
  clearDataFileTypeNew,
} from "../../../../../../redux/formData/FileTypeData";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  TypeFileCreated: {
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

const TypeFileCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, FileTypeData } = useSelector((store) => store);
  const { TypeFileCreated } = modalConfig;
  const { id, name, description } = FileTypeData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FileNew = {
        id: id,
        name: name,
        description: description
    }
    console.log(FileNew);
    dispatch(CreatedTypeFileConfig(FileNew));
    OpenModalTypeFileConfig();
  };

  const typefile = (
    <div className={styless.TypeFileCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Nuevo Tipo de Archivo</TitleModal>
        </div>
        <br />
        <TextField
          value={name}
          onChange={(e) => dispatch(getNameFileTypeNew(e.target.value))}
          label="Nombre"
          required={true}
          className={styless.textfield}
        />
        <br />
        <TextField
          value={description}
          onChange={(e) => dispatch(getDescriptionFileTypeNew(e.target.value))}
          required={true}
          label="Descripcion"
          className={styless.textfield}
        />
        <br />
        <br />
        <div align="right">
          {name != "" && description != "" ? (
            <SaveButton>Crear</SaveButton>
          ) : (
            <></>
          )}
          <CancelButton onClick={() => OpenModalTypeFileConfig()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalTypeFileConfig = () => {
    dispatch(setOpenModalTypeFileCreated(false));
    dispatch(clearDataFileTypeNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={TypeFileCreated} onClose={OpenModalTypeFileConfig}>
        {typefile}
      </Modal>
    </div>
  );
};

export default TypeFileCreated;
