import { useEffect } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalListElementCreated } from "../../../../../../redux/states/ActionConfig";
import {
  CancelButton,
  SaveButton,
  TitleModal,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getNameElementNew,
  getListElementNew,
  clearDataElementNew,
} from "../../../../../../redux/formData/ElementData";
import { CreatedElementListConfig } from "../../../../../../redux/states/List";

const useStyless = makeStyles((theme) => ({
  ListElementCreated: {
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

const ElementCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, listCore, elementDataNew } = useSelector(
    (store) => store
  );
  const { SelectedList } = listCore;
  const { id, name, listId } = elementDataNew;
  const { ListElementCreated } = modalConfig;

  useEffect(() => {
    dispatch(getListElementNew(SelectedList?.id));
  }, [ListElementCreated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ElementNew = {
      id: id,
      name: name,
      listId: listId,
    };
    console.log(ElementNew);
    dispatch(CreatedElementListConfig(ElementNew, listId));
    OpenModalElementListCreated();
  };

  const header = (
    <div className={styless.ListElementCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Crear Nuevo Elemento</TitleModal>
        </div>
        <br />
        <TextField
          value={name}
          onChange={(e) => dispatch(getNameElementNew(e.target.value))}
          required={true}
          label="Nombre"
          className={styless.textfield}
        />
        <br />
        <br />
        <div align="right">
          {id != "" && name != "" ?
          <SaveButton>Crear</SaveButton>
        : <></>}
          <CancelButton onClick={() => OpenModalElementListCreated()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalElementListCreated = () => {
    dispatch(setOpenModalListElementCreated(false));
    dispatch(clearDataElementNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={ListElementCreated} onClose={OpenModalElementListCreated}>
        {header}
      </Modal>
    </div>
  );
};

export default ElementCreated;
