import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalRecuperationPassword } from "../../../redux/states/ActionSecurity";
import styled from "styled-components";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Steps } from "primereact/steps";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { PublicRoutes } from "../../../models/routes";
import {
  resetFormPassword,
  setValidatePingUsed,
  changePasswordVerification,
} from "../../../redux/states/LoginUser";
import toast, { Toaster } from "react-hot-toast";

const useStyless = makeStyles((theme) => ({
  ResetPass: {
    position: "absolute",
    width: "400px",
    height: "500px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 16px 16px",
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

const ModalReset = (props) => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const navigate = useNavigate();
  const { modalSecurity, sesion } = useSelector((store) => store);
  const { TockenResetModal } = modalSecurity;
  const { passForm, userId, verifyPing } = sesion;
  const [ping, setPing] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { startingMinutes = 5, startingSeconds = 0 } = props;
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  const items = [
    {
      label: "Email Verificador",
    },
    {
      label: "Cambio de Contraseña",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userPing = {
      userId: userId,
      pinCodeUser: ping,
    };
    dispatch(setValidatePingUsed(userId, userPing));
  };

  const handleReset = (e) => {
    e.preventDefault();
    const userPass = {
      userId: userId,
      password: password1,
    };
    password1 == password2
      ? dispatch(changePasswordVerification(userPass))
      : toast.error("Las Contraseñas no Coinciden");
    if (password1 == password2) {
      navigate(`/${PublicRoutes.LOGIN}`);
      CloseModalResetPass();
    }
  };

  const ResetForm = (
    <div className={styless.ResetPass}>
      {passForm == 0 && (
        <ContainerReset>
          <Card
            title="Correo Enviado"
            subTitle="recuperacion de contraseña"
            style={{ width: "100%", color: "var(--primaryColor)" }}
          >
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              Te hemos enviamos un correo electronico con un codigo de
              verificacion de un solo uso para confirmar el restablecimiento de
              contraseña
            </p>
            <br />
            <div align="center">
              {!(mins && secs) ? (
                ""
              ) : (
                <p>
                  {" "}
                  {mins}:{secs < 10 ? `0${secs}` : secs}
                </p>
              )}
            </div>
          </Card>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-check"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="text"
                  value={ping}
                  onChange={(e) => setPing(e.target.value)}
                  required={true}
                  maxLength={5}
                />
                <label htmlFor="Pin">Digite el PIN</label>
              </span>
            </div>
          </form>
          <br />
          <Container>
            <Steps model={items} activeIndex={passForm} readOnly={true} />
          </Container>
        </ContainerReset>
      )}

      {passForm == 1 && (
        <ContainerReset>
          <Card title="Nueva Contraseña" style={{ width: "100%" }} />
          <br />
          <form onSubmit={handleReset}>
            <br />
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <label htmlFor="Ping">Digite la nueva Contraseña</label>
              </span>
            </div>
            <br />
            <br />
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <label htmlFor="Ping">Vuelva a ingresar la Contraseña</label>
              </span>
            </div>
            <br />
            <br />
            <div align="center">
              <Button
                label="Guardar"
                icon="pi pi-check"
                className="p-button-info"
              />
            </div>
          </form>
          <br />
          <Container>
            <Steps model={items} activeIndex={passForm} readOnly={true} />
          </Container>
        </ContainerReset>
      )}
    </div>
  );

  const CloseModalResetPass = () => {
    dispatch(setOpenModalRecuperationPassword(false));
    dispatch(resetFormPassword());
    setPing("");
  };

  return (
    <div className={styless.container}>
      <Modal open={TockenResetModal} onClose={CloseModalResetPass}>
        {ResetForm}
      </Modal>
    </div>
  );
};

export default ModalReset;

const ContainerReset = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
