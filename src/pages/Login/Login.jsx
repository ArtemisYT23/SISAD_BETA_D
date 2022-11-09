import Button from "../../Styles/loginStyle/Button";
import Icon from "../../Styles/loginStyle/Icon";
import Input from "../../Styles/loginStyle/Input";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  ContainerLogin,
  MainContainer,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  LoginWith,
  HorizontalRule,
  IconsContainer,
  ForgotPassword,
} from "./style/loginStyles";
import { setLoginUserTocken } from "../../redux/states/LoginUser";
import { getUserInformationSecurity } from "../../redux/states/UserSesion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models";
import imagen from "../../../assets/Img/login/background.png";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sesion, userSesion } = useSelector((store) => store);
  const { RolSesion } = userSesion;
  const { Route } = sesion;

  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const SubmitForm = () => {
    const FormUser = {
      userName: user,
      password: pass,
    };
    dispatch(setLoginUserTocken(FormUser));
  };

  useEffect(() => {
    if (Route == 200) {
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
      dispatch(getUserInformationSecurity(RolSesion[0]));
    }
  }, [Route]);

  useEffect(() => {
    const login = document.getElementById("imagen")
    login.style.backgroundImage = `url('${imagen}')`
  }, []);

  return (
    <ContainerLogin id="imagen">
      <MainContainer>
        <WelcomeText>Bienvenido</WelcomeText>
        <InputContainer>
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setUser(e.target.value)}
          />
          <br />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </InputContainer>
        <ButtonContainer>
          <Button content="Ingresar" onClick={SubmitForm} />
        </ButtonContainer>
        <LoginWith>Conocenos</LoginWith>
        <HorizontalRule />
        <IconsContainer>
          <Icon color={FacebookBackground}>
            <FaFacebookF />
          </Icon>
          <Icon color={InstagramBackground}>
            <FaInstagram />
          </Icon>
          <Icon color={TwitterBackground}>
            <FaTwitter />
          </Icon>
        </IconsContainer>
        <ForgotPassword>Olvidaste tu contraseña ?</ForgotPassword>
      </MainContainer>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />
      ;
    </ContainerLogin>
  );
}

export default Login;
