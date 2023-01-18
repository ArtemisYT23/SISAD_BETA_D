import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DeleteElementListConfig } from "../../../../../../redux/states/List";
import { setOpenModalListElementDelete } from "../../../../../../redux/states/ActionConfig";
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
  getIdElementUpdate,
  getNameElementUpdate,
  getListIdElementUpdate,
  clearElementUpdate,
} from "../../../../../../redux/formData/ElementData";
import { Alert } from "./Icons";

const useStyless = makeStyles((theme) => ({
  ListElementDelete: {
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

const deleteElementList = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, elementDataNew, listCore } = useSelector(
    (store) => store
  );
  const { ListElementDelete } = modalConfig;
  const { idUpdate, nameUpdate, listIdUpdate } = elementDataNew;
  const { selectedElement } = listCore;
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    dispatch(getIdElementUpdate(selectedElement?.id));
    dispatch(getNameElementUpdate(selectedElement?.name));
    dispatch(getListIdElementUpdate(selectedElement?.listId));
  }, [ListElementDelete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const DeleteData = {
      id: idUpdate,
    };
    dispatch(DeleteElementListConfig(DeleteData, idUpdate, listIdUpdate));
    OpenModalElementListDelete();
  };

  const elementDelete = (
    <div className={styless.ListElementDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>
            Eliminar Tipo de dato {selectedElement?.name}
          </TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Este Elemento de</label>
          <label>la lista sera eliminado</label>
          <label> no representa</label>
          <label> afectacion a los registros</label>
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
          <ButtonCancel onClick={() => OpenModalElementListDelete()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalElementListDelete = () => {
    dispatch(setOpenModalListElementDelete(false));
    dispatch(clearElementUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={ListElementDelete} onClose={OpenModalElementListDelete}>
        {elementDelete}
      </Modal>
    </div>
  );
};

export default deleteElementList;
