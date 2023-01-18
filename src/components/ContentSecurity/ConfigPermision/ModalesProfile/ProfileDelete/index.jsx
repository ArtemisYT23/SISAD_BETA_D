import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalProfileDelete } from "../../../../../redux/states/ActionSecurity";
import { DeleteProfileCore } from "../../../../../redux/states/Profile";
import {
    TitleModal,
    IconAlert,
    AlertDelete,
    AcepDelete,
    ContaiderButton,
    ButtonDelete,
    ButtonCancel
} from "../../../../../Styles/ModalesStyles/modalStyle";
import { Alert } from "./Icons";

const useStyless = makeStyles((theme) => ({
  ProfileDelete: {
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

const ProfileDeletePermision = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalSecurity, profileCore } = useSelector((store) => store);
  const { ProfileDelete } = modalSecurity;
  const { SelectedProfile } = profileCore;

  const [buttonActive, setButtonActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const deleteProfile = {
        profiles: [
          {
            id: SelectedProfile?.id
          }
        ]
      }
    console.log(deleteProfile);
    dispatch(DeleteProfileCore(deleteProfile));
    OpenModalProfileDelete()
  }

  const HeaderDeleteProfile = (
  <div className={styless.ProfileDelete}>
    <form onSubmit={handleSubmit}>
        <div align="center">
            <TitleModal>ELIMINAR AL PERFIL {SelectedProfile?.name}</TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Esta seguro de </label>
          <label> eliminar este Perfil</label>
          <label>Sus Accesos tambien</label>
          <label>Seran Eliminados</label>
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
          <ButtonCancel onClick={() => OpenModalProfileDelete()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
    </form>
  </div>
  );

  const OpenModalProfileDelete = () => {
    dispatch(setOpenModalProfileDelete(false));
  };

  return (
    <div className={styless.container}>
      <Modal open={ProfileDelete} onClose={OpenModalProfileDelete}>
        {HeaderDeleteProfile}
      </Modal>
    </div>
  );
};

export default ProfileDeletePermision;
