import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setChangePasswordModalGenerate } from "../../../../../redux/states/ActionSecurity";
import { changePasswordByUser } from "../../../../../redux/states/UserSesion";
import { TitleModal } from "../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  PasswordChange: {
    position: "absolute",
    width: "400px",
    height: "200px",
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

const GeneratePassword = () => {
  const styless = useStyless();
  const dispatch = useDispatch();

  const { modalSecurity, userCore, userSesion } = useSelector((store) => store);
  const { generatePassword } = modalSecurity;
  const { SelectionUser } = userCore;
  const { passwordGenerate } = userSesion;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePasswordByUser(SelectionUser?.id));
  };

  const handleExit = (e) => {
    e.preventDefault();
    OpenModalUserDelete();
  };

  const changeUserPassword = (
    <div className={styless.PasswordChange}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>GENERAR NUEVA CONTRASEÑA</TitleModal>
        </div>
        <div align="center">
          <InputValue type="text" value={passwordGenerate} disabled />
          <ButtonSubmit>Generar</ButtonSubmit>
          <CancelSubmit onClick={(e) => handleExit(e)}>Salir</CancelSubmit>
        </div>
      </form>
    </div>
  );

  const OpenModalUserDelete = () => {
    dispatch(setChangePasswordModalGenerate(false));
  };

  return (
    <div className={styless.container}>
      <Modal open={generatePassword} onClose={OpenModalUserDelete}>
        {changeUserPassword}
      </Modal>
    </div>
  );
};

export default GeneratePassword;

const InputValue = styled.input`
  width: 300px;
  height: 35px;
  margin: 1rem 0 1rem 0;
`;

const ButtonSubmit = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 13px;
  border: none;
  background: var(--primaryColor);
  color: #fff;
  margin: 0 1rem 0 0;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const CancelSubmit = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 13px;
  border: 1px solid var(--primaryColor);
  color: var(--primaryColor);
  background-color: #fff;
  margin: 0 1rem 0 0;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
