import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalGroupDelete } from "../../../../../../redux/states/ActionCore";
import { DeleteGroupNew } from "../../../../../../redux/states/Group";
import { getIdGroupUpdate, clearDataUpdateGroup } from "../../../../../../redux/formData/GroupData";
import { Alert } from "./Icons";
import {
  TitleModal,
  IconAlert,
  AlertDelete,
  AcepDelete,
  ButtonDelete,
  ButtonCancel,
  ContaiderButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  GroupDelete: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "13px",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const DeleteGroup = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalCore, groupCore, groupData } = useSelector((store) => store);
  
  const { GroupDelete } = modalCore;
  const { idUpdate } = groupData;
  const { UpdateSelectedGroup } = groupCore;
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    dispatch(getIdGroupUpdate(UpdateSelectedGroup?.id));
  },[GroupDelete])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonActive(false);
    const GroupData = { 
      id: idUpdate
    }
    dispatch(DeleteGroupNew(GroupData, idUpdate));
    OpenModalDeleteGroup();
  };

  const deleteGroup = (
    <div className={styless.GroupDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>
            ELIMINAR EL GRUPO {UpdateSelectedGroup?.name}
          </TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Esta seguro de </label>
          <label>eliminar el grupo</label>
          <label>los gabinetes no se</label>
          <label>veran afectados</label>
          <AcepDelete onClick={() => setButtonActive(true)}>Aceptar</AcepDelete>
        </AlertDelete>
        <ContaiderButton align="right">
          <ButtonDelete type="submit" disabled={!buttonActive}>
            Eliminar
          </ButtonDelete>
          <ButtonCancel onClick={() => OpenModalDeleteGroup()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalDeleteGroup = () => {
    setButtonActive(false);
    dispatch(setOpenModalGroupDelete(false));
    dispatch(clearDataUpdateGroup());
  };

  return(
    <div className={styless.container}>
      <Modal open={GroupDelete} onClose={OpenModalDeleteGroup}>
        {deleteGroup}
      </Modal>
    </div>
  );
};

export default DeleteGroup;
