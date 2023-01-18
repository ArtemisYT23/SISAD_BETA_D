import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenTypeDataDelete } from "../../../../../../redux/states/ActionConfig";
import { DeleteTypeDataConfig } from "../../../../../../redux/states/DataType";
import {
  TitleModal,
  IconAlert,
  AlertDelete,
  AcepDelete,
  ContaiderButton,
  ButtonDelete,
  ButtonCancel,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getIdDataTypeUpdate,
  clearDataTypeUpdate,
} from "../../../../../../redux/formData/DataTypeData";
import { Alert } from "./Icons";

const useStyless = makeStyles((theme) => ({
  TypeDataDelete: {
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

const TypeDataDelete = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, DataTypeData, typeDataCore } = useSelector(
    (store) => store
  );
  const { TypeDataDelete } = modalConfig;
  const { SelectedTypeData } = typeDataCore;
  const { idUpdate } = DataTypeData;
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    dispatch(getIdDataTypeUpdate(SelectedTypeData?.id));
  }, [TypeDataDelete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const DeleteData = {
      id: idUpdate,
    };
    dispatch(DeleteTypeDataConfig(DeleteData, idUpdate));
    OpenModalDataTypeDelete();
  };

  const typeDelete = (
    <div className={styless.TypeDataDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>
            Eliminar Tipo de dato {SelectedTypeData?.name}
          </TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Para que el índice</label>
          <label>pueda ser eliminado</label>
          <label>no debe contener registros</label>
          <label>de datos</label>
          <AcepDelete
            onClick={() => setButtonActive(true)}
            disabled={!buttonActive}
          >
            Aceptar
          </AcepDelete>
        </AlertDelete>
        <ContaiderButton align="right">
          <ButtonDelete type="submit" disabled={!buttonActive}>
            Eliminar
          </ButtonDelete>
          <ButtonCancel onClick={() => OpenModalDataTypeDelete()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalDataTypeDelete = () => {
    dispatch(setOpenTypeDataDelete(false));
    dispatch(clearDataTypeUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={TypeDataDelete} onClose={OpenModalDataTypeDelete}>
        {typeDelete}
      </Modal>
    </div>
  );
};

export default TypeDataDelete;
