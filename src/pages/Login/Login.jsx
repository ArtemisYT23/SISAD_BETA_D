import Button from "../../Styles/loginStyle/Button";
import Icon from "../../Styles/loginStyle/Icon";
import Input from "../../Styles/loginStyle/Input";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
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
import { PrivateRoutes, PublicRoutes } from "../../models";
import imagen from "../../../assets/Img/login/background.png";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sesion, userSesion } = useSelector((store) => store);
  const { RolSesion } = userSesion;
  const { Route, TockenUser } = sesion;

  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  const linkenBackground = "linear-gradient(to right, #0a66c2 0%, #0a66c2 50%)";

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const SubmitForm = (e) => {
    e.preventDefault();
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
    const login = document.getElementById("imagen");
    login.style.backgroundImage = `url('${imagen}')`;
  }, []);

  const resetPassword = () => {
    navigate(`/${PublicRoutes.RESET}`);
  };

  return (
    <ContainerLogin id="imagen">
      <MainContainer>
        <WelcomeText>Bienvenido</WelcomeText>

        <form onSubmit={SubmitForm}>
          <InputContainer>
            <Input
              type="text"
              placeholder="Usuario"
              onChange={(e) => setUser(e.target.value)}
            />
            <br />
            <Input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPass(e.target.value)}
            />
          </InputContainer>
          <ButtonContainer>
            <Button content="Ingresar" />
          </ButtonContainer>
        </form>

        <LoginWith>Conocenos</LoginWith>
        <HorizontalRule />
        <IconsContainer>
          <Icon color={FacebookBackground} url="https://www.facebook.com/CentralFile">
            <FaFacebookF />
          </Icon>
          <Icon color={InstagramBackground} url="https://www.instagram.com/centralfile/?hl=es"> 
            <FaInstagram />
          </Icon>
          <Icon color={TwitterBackground} url="https://twitter.com/centralfileec?lang=es">
            <FaTwitter />
          </Icon>
          <Icon color={linkenBackground} url="https://www.linkedin.com/company/centralfile-sa/mycompany/">
            <FaLinkedinIn />
          </Icon>
        </IconsContainer>
        <ForgotPassword onClick={(e) => resetPassword()}>
          Olvidaste tu contraseña ?
        </ForgotPassword>
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
