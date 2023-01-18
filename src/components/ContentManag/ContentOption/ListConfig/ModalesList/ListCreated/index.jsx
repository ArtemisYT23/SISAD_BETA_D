import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  TitleModal,
  TitleArchive,
  SaveButton,
  CancelButton,
  Selected,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import { setOpenModalListDataCreated } from "../../../../../../redux/states/ActionConfig";
import {
  getNameListNew,
  getListListNew,
  getListNullListNew,
  clearDataListNew,
} from "../../../../../../redux/formData/ListData";
import { CreatedListConfig } from "../../../../../../redux/states/List";

const useStyless = makeStyles((theme) => ({
  ListDataCreated: {
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

const ListCreated = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { listCore, modalConfig, listDataNew } = useSelector((store) => store);
  const { id, name, listId } = listDataNew;
  const { ListData } = listCore;
  const { ListDataCreated } = modalConfig;

  const handleChange = (value) => {
    value != 0
      ? dispatch(getListListNew(value))
      : dispatch(getListNullListNew());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listNew = {
      id: id,
      name: name,
      listId: listId,
    };
    console.log(listNew);
    dispatch(CreatedListConfig(listNew));
    OpenModalListDataCreated();
  };

  const Valor = 0;

  const bodyList = (
    <div className={styless.ListDataCreated}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Crear Nueva Lista</TitleModal>
        </div>
        <TextField
          value={name}
          onChange={(e) => dispatch(getNameListNew(e.target.value))}
          required={true}
          label="Nombre"
          className={styless.textfield}
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
          {id != "" && name != "" ? <SaveButton>Crear</SaveButton> : <></>}
          <CancelButton onClick={() => OpenModalListDataCreated()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalListDataCreated = () => {
    dispatch(setOpenModalListDataCreated(false));
    dispatch(clearDataListNew());
  };

  return (
    <div className={styless.container}>
      <Modal open={ListDataCreated} onClose={OpenModalListDataCreated}>
        {bodyList}
      </Modal>
    </div>
  );
};

export default ListCreated;
