import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setOpenModalDeleteResource } from "../../../../../redux/states/ActionSecurity";
import {
  TitleModal,
  IconAlert,
  AlertDelete,
  AcepDelete,
  ContaiderButton,
  ButtonDelete,
  ButtonCancel,
} from "../../../../../Styles/ModalesStyles/modalStyle";
import { Alert } from "./Icons";
import { deletePermissionCabinet } from "../../../../../redux/states/ResourceCore";

const useStyless = makeStyles((theme) => ({
  ResourceDelete: {
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

const ResourceDeleteCore = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalSecurity, userCore } = useSelector((store) => store);
  const { ResourceDelete } = modalSecurity;
  const { SelectionUser } = userCore;

  const [buttonActive, setButtonActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deletePermissionCabinet(SelectionUser?.id));
    OpenModalPermisionDelete();
  };

  const HeaderDeleteResource = (
    <div className={styless.ResourceDelete}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>ELIMINAR EL PERMISO</TitleModal>
        </div>
        <IconAlert>
          <Alert x={40} y={40} />
        </IconAlert>
        <AlertDelete>
          <label>Esta seguro de </label>
          <label> eliminar este Permiso</label>
          <label>Sus Accesos a estos</label>
          <label>Recursos estaran inhabilitado</label>
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
          <ButtonCancel onClick={() => OpenModalPermisionDelete()}>
            Cancelar
          </ButtonCancel>
        </ContaiderButton>
      </form>
    </div>
  );

  const OpenModalPermisionDelete = () => {
    dispatch(setOpenModalDeleteResource(false));
    setButtonActive(false);
  };

  return (
    <div className={styless.container}>
      <Modal open={ResourceDelete} onClose={OpenModalPermisionDelete}>
        {HeaderDeleteResource}
      </Modal>
    </div>
  );
};

export default ResourceDeleteCore;
