import imagen from "../../../assets/Img/login/background.png";
import { useEffect, useState } from "react";
import Button from "../../Styles/loginStyle/Button";
import Input from "../../Styles/loginStyle/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalReset from "./ModalReset";
import { setUserResetPassword } from "../../redux/states/LoginUser";
import { PublicRoutes } from "../../models/routes";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [active, inactive] = useState(false);

  useEffect(() => {
    const login = document.getElementById("imagen");
    login.style.backgroundImage = `url('${imagen}')`;
  }, []);

  useEffect(() => {
    user != "" ? inactive(false) : inactive(true);
  }, [user]);

  const handleChange = (value) => {
    setUser(value);
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    const userData = {
      username: user,
    };
    dispatch(setUserResetPassword(userData));
    setUser("");
  };

  const ReturnSesion = (e) => {
    e.preventDefault();
    navigate(`/${PublicRoutes.LOGIN}`);
  };

  return (
    <ContainerLogin id="imagen">
      <MainContainer>
        <ContainerInfo>
          <span>Ingrese su nombre de usuario</span>
        </ContainerInfo>
        <br />
        <br />
        <form onSubmit={SubmitForm}>
          <InputContainer>
            <Input
              type="text"
              placeholder="USUARIO"
              value={user}
              onChange={(e) => handleChange(e.target.value)}
            />
            <br />
          </InputContainer>
          <ButtonContainer>
            <Button disabled={active} content="RECUPERAR" />
          </ButtonContainer>
          <br />
        </form>
        <form onSubmit={ReturnSesion}>
          <ButtonContainer>
            <Return>REGRESAR</Return>
          </ButtonContainer>
        </form>
        <br />
      </MainContainer>
      <ModalReset />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 3500,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />
    </ContainerLogin>
  );
};

export default ResetPassword;

const ContainerLogin = styled.div`
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 60vh;
  }
`;

const ContainerInfo = styled.div`
  width: 90%;
  height: 80px;
  background: var(--primaryColor);
  border-radius: 10px;
  margin: 1rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Return = styled.button`
  background: linear-gradient(to right, #efa254 0%, #fc7e00 79%);
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  width: 300px;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;
