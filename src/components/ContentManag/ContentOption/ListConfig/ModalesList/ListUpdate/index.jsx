import { useState, useEffect } from "react";
import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalListDataUpdate } from "../../../../../../redux/states/ActionConfig";
import { UpdateElementConfig } from "../../../../../../redux/states/List";
import {
  TitleModal,
  TitleArchive,
  SaveButton,
  CancelButton,
  Selected
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import {
  getIdListUpdate,
  getNameListUpdate,
  getListListUpdate,
  getListNullListUpdate,
  clearDataListUpdate,
} from "../../../../../../redux/formData/ListData";

const useStyless = makeStyles((theme) => ({
  ListDataUpdate: {
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

const ListUpdate = ({ id, name, listId }) => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalConfig, listDataNew, listCore } = useSelector((store) => store);
  const { ListDataUpdate } = modalConfig;
  const { SelectedList, ListData } = listCore;
  const { idUpdate, nameUpdate, listIdUpdate } = listDataNew;

    useEffect(() => {
        dispatch(getIdListUpdate(SelectedList?.id));
        dispatch(getNameListUpdate(SelectedList?.name));
        dispatch(getListListUpdate(SelectedList?.listId));
    },[ListDataUpdate])

  const handleChange = (value) => {
    value != 0 ? dispatch(getListListUpdate(value)) : dispatch(getListNullListUpdate())
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const UpdateList = {
        id: idUpdate,
        name: nameUpdate,
        listId: listIdUpdate
    }
    dispatch(UpdateElementConfig(UpdateList ,idUpdate));
    OpenModalUpdateList();
  };

  const Valor = 0;

  const body = (
    <div className={styless.ListDataUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Editar Lista</TitleModal>
        </div>
        <br />
        <TextField
          value={nameUpdate}
          onChange={(e) => dispatch(getNameListUpdate(e.target.value))}
          label="Nombre"
          className={styless.textfield}
          autoComplete="off"
        />
        <br />
        <br />
        <TitleArchive>Listas: </TitleArchive>
        <br />
        <br />
        <Selected onChange={(e) => handleChange(e.target.value)}>
          <option value={Valor}>Ninguna</option>
          {ListData.map((ListData) => (
            <option key={ListData.id} value={ListData.id}>
              {ListData.name}
            </option>
          ))}
        </Selected>
        <br />
        <br />
        <div align="right">
          <SaveButton>Guardar</SaveButton>
          <CancelButton onClick={() => OpenModalUpdateList()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalUpdateList = () => {
    dispatch(setOpenModalListDataUpdate(false));
    dispatch(clearDataListUpdate());
  };

  return (
    <div className={styless.container}>
      <Modal open={ListDataUpdate} onClose={OpenModalUpdateList}>
        {body}
      </Modal>
    </div>
  );
};

export default ListUpdate;
