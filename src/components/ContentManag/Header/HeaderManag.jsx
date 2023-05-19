import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logout from "../../../../assets/Img/Core/logout.png";
import settings from "../../../../assets/Img/Core/settings.png";
import user from "../../../../assets/Img/Core/user.png";
import { PrivateRoutes, PublicRoutes } from "../../../models/routes";
import { setOpenDetalleModal } from "../../../redux/states/ActionDocumentary";
import { setSelectedCabinetCore } from "../../../redux/states/Cabinet";
import { setSelectedGroupCore } from "../../../redux/states/Group";
import {
  closeSesionCleaningState,
  getNameGlobalChangeCleaner,
  setClearElementBreak,
  setClearElementFolderBreak,
  setClearElementGroupBreak,
} from "../../../redux/states/Name";
import {
  setSelectedNullCore,
  setSelectedSearchNullCore,
} from "../../../redux/states/View";
import "../../../Styles/Headers/Header.css";

const HeaderManag = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nameCore, userSesion } = useSelector((store) => store);
  const {
    NameManagmentSelected,
    breackcompGroup,
    breackcomp,
    breackcompFolder,
  } = nameCore;
  const { RolSesion, DataUser } = userSesion;

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

  const RouteInitial = () => {
    dispatch(setSelectedNullCore());
    dispatch(setSelectedSearchNullCore());
    dispatch(setClearElementBreak());
    dispatch(setClearElementFolderBreak());
    dispatch(setClearElementGroupBreak());
    dispatch(getNameGlobalChangeCleaner());
    dispatch(setOpenDetalleModal(false));
  };

  const RouteGroup = (index) => {
    dispatch(setSelectedGroupCore(index));
    dispatch(setClearElementBreak());
    dispatch(setClearElementFolderBreak());
    dispatch(setOpenDetalleModal(false));
  };

  const RouteCabinet = (index) => {
    dispatch(setClearElementFolderBreak());
    dispatch(setSelectedCabinetCore(index));
    dispatch(setOpenDetalleModal(false));
  };

  const RouteFolder = () => {};

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
                <AvataDrop src={DataUser?.photoUrl} />
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
          {NameManagmentSelected ? (
            <Title>
              <h1>{NameManagmentSelected}</h1>
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
            <Avatar src={DataUser?.photoUrl} />
          </Perfiles>
        </OptionContainer>
      </HeaderUP>
    </HeaderContainer>
  );
};

export default HeaderManag;

const HeaderContainer = styled.div`
  height: 4.8rem;
  border-bottom: 1px solid var(--lineColor);
`;

const HeaderUP = styled.div`
  width: 95%;
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

const HeaderDOWN = styled.div`
  height: 10%;
  display: flex;
  align-items: flex-end;
`;

const LineBreack = styled.a`
  color: #939393;
  background-image: linear-gradient(90deg, #5b5b5b, #5b5b5b, #5b5b5b);
  text-decoration: none;
  font-family: var(--font-Global);
  font-weight: 600;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  background-position: left bottom;
  &:hover {
    background-size: 100% 2px;
  }
`;

const ContainerUser = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;
