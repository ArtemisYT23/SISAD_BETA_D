import { useDispatch, useSelector } from "react-redux";
import { TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalTypeDataCreated } from "../../../../../../redux/states/ActionConfig";
import { CreatedTypeDataConfig } from "../../../../../../redux/states/DataType";
import {
  getNameDataTypeNew,
  clearDataTypeNew,
} from "../../../../../../redux/formData/DataTypeData";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  TypeDataCreated: {
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

const TypeDataCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, DataTypeData } = useSelector((store) => store);
  const { TypeDataCreated } = modalConfig;
  const { id, name } = DataTypeData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const DataType = {
      id: id,
      name: name,
    };
    console.log(DataType);
    dispatch(CreatedTypeDataConfig(DataType));
    OpenModalDataTypeCreated();
  };

  const typeData = (
    <div className={styless.TypeDataCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Nuevo Tipo de Dato</TitleModal>
        </div>
        <br />
        <TextField
          value={name}
          onChange={(e) => dispatch(getNameDataTypeNew(e.target.value))}
          label="Nombre"
          required={true}
          className={styless.textfield}
        />
        <br />
        <br />
        <div align="right">
          {id != "" && name != "" ? <SaveButton>Crear</SaveButton> : <></>}
          <CancelButton onClick={() => OpenModalDataTypeCreated()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalDataTypeCreated = () => {
    dispatch(setOpenModalTypeDataCreated(false));
    dispatch(clearDataTypeNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={TypeDataCreated} onClose={OpenModalDataTypeCreated}>
        {typeData}
      </Modal>
    </div>
  );
};

export default TypeDataCreated;
