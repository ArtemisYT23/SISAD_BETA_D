import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "./Icons";
import { setOpenModalDeleteUser } from "../../../../../redux/states/ActionSecurity";
import {
  setIdUpdateChangeUser,
  clearDataUpdateChangeUser,
} from "../../../../../redux/formData/UserData";
import { setUserDeleteSecurity } from "../../../../../redux/states/UserCore";
import {
  TitleModal,
  IconAlert,
  AlertDelete,
  AcepDelete,
  ContaiderButton,
  ButtonDelete,
  ButtonCancel
} from "../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  UserDelete: {
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

const UserDelete = () => {
  const styless = useStyless();
  const dispatch = useDispatch();

  const { modalSecurity, changeUser, userCore } = useSelector((store) => store);
  const { UserDelete } = modalSecurity;
  const { SelectionUser } = userCore;
  const { idUpdate } = changeUser;

  useEffect(() => {
    dispatch(setIdUpdateChangeUser(SelectionUser?.id));
  }, [UserDelete]);

  const [buttonActive, setButtonActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataDelete = { 
      users: [
        {
          id: idUpdate
        }
      ]
    }
      dispatch(setUserDeleteSecurity(dataDelete));
      OpenModalUserDelete();
  };

  const deleteUser = (
    <div className={styless.UserDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>ELIMINAR AL USUARIO {SelectionUser?.userName}</TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Esta seguro de </label>
          <label> eliminar este Usuario</label>
          <label></label>
          <AcepDelete
            onClick={() => setButtonActive(true)}
            disabled={!buttonActive}
          >
            Aceptar
          </AcepDelete>
        </AlertDelete>
        <ContaiderButton align="right">
          <ButtonDelete
            type="submit"
            disabled={!buttonActive}
          >
            Eliminar
          </ButtonDelete>
          <ButtonCancel onClick={() => OpenModalUserDelete()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalUserDelete = () => {
    dispatch(setOpenModalDeleteUser(false));
    dispatch(clearDataUpdateChangeUser());
  };

  return (
    <div className={styless.container}>
      <Modal open={UserDelete} onClose={OpenModalUserDelete}>
        {deleteUser}
      </Modal>
    </div>
  );
};

export default UserDelete;
