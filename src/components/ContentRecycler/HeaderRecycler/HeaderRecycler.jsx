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

const HeaderRecycler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const { nameCore, userSesion } = useSelector((store) => store);
  const { NameGlobalSelected } = nameCore;
  const { RolSesion, DataUser } = userSesion;
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setPhoto(DataUser?.photoUrl);
  }, [DataUser]);

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
              <li onClick={() => CerrarSesion()} className="dropdownItem">
                <img src={logout}></img>
                <a> {"Cerrar Sesion"} </a>
              </li>
            </ul>
          </div>
        </>
      )}
      <HeaderUP>
        <NameContainer>
          {NameGlobalSelected ? (
            <Title>
              <h1>{NameGlobalSelected}</h1>
            </Title>
          ) : (
            <Title>
              <h1>SISAD CLOUD</h1>
            </Title>
          )}
        </NameContainer>
        <OptionContainer>
          <ContentText>
            <TextName>
              <h1>{RolSesion[1]}</h1>
            </TextName>
          </ContentText>
          <Perfiles onClick={() => ActiveMenu()}>
            <Avatar src={photo} />
          </Perfiles>
        </OptionContainer>
      </HeaderUP>
    </HeaderContainer>
  );
};

export default HeaderRecycler;

const HeaderContainer = styled.div`
  width: 100%;
  height: 4.8rem;
  border-bottom: 1px solid var(--lineColor);
`;

const HeaderUP = styled.div`
  height: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ContentText = styled.div`
  display: flex;
  width: 100px;
  height: 50px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  width: 250px;
  display: flex;
  text-align: justify;
  h1 {
    font-size: 25px;
    color: var(--primaryColor);
  }
`;

const TextName = styled.div`
  width: 80px;
  display: flex;
  text-align: justify;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  h1 {
    font-size: 25px;
    color: var(--primaryColor);
  }
`;

const OptionContainer = styled.div`
  display: flex;
  width: 150px;
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
`;

const Perfiles = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 0 0.3rem 0 0;
`;

const Avatar = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  transform: translateX(21%);
  &:last-child {
    transform: translateX(0);
  }
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
  padding: 0.5rem;
`;
