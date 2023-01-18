import styled from "styled-components";
import { OptionsIcon } from "./icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "../../../models/routes";
import { closeSesionCleaningState } from "../../../redux/states/Name";
import { Tooltip } from "@material-ui/core";
import "../../../Styles/Headers/Header.css";
import user from "../../../../assets/Img/Core/user.png";
import help from "../../../../assets/Img/Core/question.png";
import settings from "../../../../assets/Img/Core/settings.png";
import logout from "../../../../assets/Img/Core/logout.png";

const HeaderSecurity = ({ Title, SubTitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSesion } = useSelector((store) => store);
  const { RolSesion, DataUser } = userSesion;
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setPhoto(DataUser?.photoUrl);
  }, [DataUser]);

  const [showMenu, setShowMenu] = useState(false);
  const ActiveMenu = () => {
    setShowMenu(!showMenu);
  };

  const changeStateDrop = () => {
    if (showMenu == true) {
      setShowMenu(false);
    }
  };

  const CerrarSesion = () => {
    dispatch(closeSesionCleaningState());
    navigate(`/${PublicRoutes.LOGIN}`);
  };

  const handleUrl = () => {
    navigate(`/private/${PrivateRoutes.DASHBOARD}`);
  };

  const handleUrl1 = () => {
    navigate(`/private/${PrivateRoutes.DASHBOARD}/Profile`);
  };

  return (
    <HeaderContainer onClick={() => changeStateDrop()}>
      {showMenu && (
        <>
          <div className={`dropdown-menu ${showMenu ? "active" : "inactive"}`}>
            <h3>
              <ContainerUser>
                <AvataDrop src={photo} />
              </ContainerUser>
              {RolSesion[1]}
              <br />
              <span>{RolSesion[2]}</span>
            </h3>
            <ul>
              <li className="dropdownItem" onClick={() => handleUrl()}>
                <img src={user}></img>
                <a> {"Mi Perfil"} </a>
              </li>
              <li className="dropdownItem" onClick={() => handleUrl1()}>
                <img src={settings}></img>
                <a> {"Configuraciones"} </a>
              </li>
              {/* <li className="dropdownItem">
                <img src={help}></img>
                <a> {"Ayuda"} </a>
              </li> */}
              <li onClick={() => CerrarSesion()} className="dropdownItem">
                <img src={logout}></img>
                <a> {"Cerrar Sesion"} </a>
              </li>
            </ul>
          </div>
        </>
      )}

      <UserHeaderContainer>
        <OptionContainer>
          <ContentText>
            <TextName>{RolSesion[1]}</TextName>
          </ContentText>
          <Perfiles onClick={() => ActiveMenu()}>
            <Avatar src={photo} />
          </Perfiles>
        </OptionContainer>

        <ContainerTextInfo>
          <TitlePanel>{Title}</TitlePanel>
          <SubTitlePanel>{SubTitle}</SubTitlePanel>
        </ContainerTextInfo>
      </UserHeaderContainer>
    </HeaderContainer>
  );
};

export default HeaderSecurity;

const HeaderContainer = styled.div`
  border-bottom: 1px solid var(--lineColor);
  @media (max-width: 767px) {
  }
`;

const ContentText = styled.div`
  display: flex;
  width: 100px;
  height: 50px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const OptionContainer = styled.div`
  display: flex;
  width: 150px;
  height: 3rem;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    margin: 1rem 0 0.6rem 0;
    padding: 0 0 0.6rem 0;
    border-bottom: 1px solid var(--lineColor);
  }
`;

const Perfiles = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 0 0.3rem 0 0;
`;

const TextName = styled.h1`
  font-size: 1.5rem;
  margin: 1rem 0 1.5rem 0;
  color: var(--primaryColor);
`;

const Avatar = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  transform: translateX(21%);
  &:last-child {
    transform: translateX(0);
  }
`;

const UserHeaderContainer = styled.div`
  display: flex;
  padding: 0.5rem 0 1rem 0;
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

const ContainerTextInfo = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    width: 90vw;
    text-align: center;
    margin: 0 0 0.6rem 0;
  }
`;

const TitlePanel = styled.span`
  color: var(--primaryColor);
  font-size: 1.2rem;
`;

const SubTitlePanel = styled.span`
  color: #484646;
`;

const AvataDrop = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  transform: translateX(21%);
  &:last-child {
    transform: translateX(0);
  }
`;

const ContainerUser = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 0 0.5rem 0;
`;
