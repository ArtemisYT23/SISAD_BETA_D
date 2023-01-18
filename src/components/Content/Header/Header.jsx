import styled from "styled-components";
import { OptionsIcon } from "./icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "../../../models/routes";
import {
  closeSesionCleaningState,
  setClearElementBreak,
  setClearElementFolderBreak,
  setClearElementFolderChildBreak,
  setClearElementGroupBreak,
  getNameGlobalChangeCleaner,
} from "../../../redux/states/Name";
import {
  setSelectedNullCore,
  setSelectedSearchNullCore,
} from "../../../redux/states/View";
import { setSelectedGroupCore } from "../../../redux/states/Group";
import { setSelectedCabinetCore } from "../../../redux/states/Cabinet";
import {
  setSelectedFolderCore,
  setFolderChildCore,
  clearFolderCabinet,
} from "../../../redux/states/Folder";
import { setOpenDetalleModal } from "../../../redux/states/ActionDocumentary";
import { Tooltip } from "@material-ui/core";
import "../../../Styles/Headers/Header.css";
import user from "../../../../assets/Img/Core/user.png";
import help from "../../../../assets/Img/Core/question.png";
import settings from "../../../../assets/Img/Core/settings.png";
import logout from "../../../../assets/Img/Core/logout.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const { nameCore, userSesion, viewCore } = useSelector((store) => store);
  const {
    NameGlobalSelected,
    breackcompGroup,
    breackcomp,
    breackcompFolder,
    breackcompFolderChild,
  } = nameCore;
  const { selectedView } = viewCore;
  const { RolSesion, DataUser } = userSesion;

  useEffect(() => {
    setPhoto(DataUser?.photoUrl);
  }, [DataUser]);

  const [showMenu, setShowMenu] = useState(false);

  const ActiveMenu = () => {
    if (selectedView != "list") {
      setShowMenu(!showMenu);
    }
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
    dispatch(setClearElementFolderChildBreak());
    dispatch(setClearElementGroupBreak());
    dispatch(getNameGlobalChangeCleaner());
    dispatch(setOpenDetalleModal(false));
    dispatch(setFolderChildCore());
    dispatch(clearFolderCabinet());
  };

  const RouteGroup = (index) => {
    dispatch(setSelectedGroupCore(index));
    dispatch(setClearElementBreak());
    dispatch(setClearElementFolderBreak());
    dispatch(setClearElementFolderChildBreak());
    dispatch(setOpenDetalleModal(false));
  };

  const RouteCabinet = (index) => {
    dispatch(setClearElementFolderBreak());
    dispatch(setClearElementFolderChildBreak());
    dispatch(setSelectedCabinetCore(index));
    dispatch(setOpenDetalleModal(false));
  };

  const RouteFolder = (index) => {
    dispatch(setClearElementFolderChildBreak());
    dispatch(setSelectedFolderCore(index));
    dispatch(setOpenDetalleModal(false));
  };

  const RouteFolderChild = () => {};

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
      <HeaderUP>
        <NameContainer>
          {NameGlobalSelected ? (
            <TextName>{NameGlobalSelected}</TextName>
          ) : (
            <TextName>SISAD CLOUD</TextName>
          )}
        </NameContainer>

        <OptionContainer>
          <ContentText>
            <TextName>{RolSesion[1]}</TextName>
          </ContentText>
          <Perfiles onClick={() => ActiveMenu()}>
            <Avatar src={photo} />
          </Perfiles>
        </OptionContainer>
      </HeaderUP>
      <HeaderDOWN>
        <Tooltip title="Inicio">
          <LineBreack onClick={() => RouteInitial()}>.REGRESAR /</LineBreack>
        </Tooltip>
        {breackcompGroup != null && (
          <LineBreack onClick={() => RouteGroup(breackcompGroup?.id)}>
            {breackcompGroup?.name}
            <label> /</label>
          </LineBreack>
        )}
        {breackcomp && (
          <LineBreack onClick={() => RouteCabinet(breackcomp?.id)}>
            {breackcomp?.name}
          </LineBreack>
        )}
        {breackcompFolder && (
          <LineBreack onClick={() => RouteFolder(breackcompFolder?.id)}>
            <label> /</label>
            {breackcompFolder?.name}
          </LineBreack>
        )}

        {breackcompFolderChild != null && (
          <LineBreack onClick={() => RouteFolderChild()}>
            <label> /</label>
            {breackcompFolderChild}
          </LineBreack>
        )}
      </HeaderDOWN>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
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

const TextName = styled.h1`
  font-size: 1.5rem;
  margin: 1rem 0 1.5rem 0;
  color: var(--primaryColor);
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
  margin: 0 0 0.5rem 0;
`;
