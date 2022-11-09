import styled from "styled-components";
import { OptionsIcon } from "./icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../models/routes";
import {
  closeSesionCleaningState,
  setClearElementBreak,
  setClearElementFolderBreak,
  setClearElementGroupBreak,
  getNameGlobalChangeCleaner,
} from "../../../redux/states/Name";
import {
  setSelectedNullCore,
  setSelectedSearchNullCore,
} from "../../../redux/states/View";
import { setSelectedGroupCore } from "../../../redux/states/Group";
import { setSelectedCabinetCore } from "../../../redux/states/Cabinet";
import { setOpenDetalleModal } from "../../../redux/states/ActionDocumentary";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nameCore, userSesion } = useSelector((store) => store);
  const { NameGlobalSelected, breackcompGroup, breackcomp, breackcompFolder } =
    nameCore;
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

  return (
    <HeaderContainer onClick={() => changeStateDrop()}>
      {showMenu && (
        <Dropdown>
          <DropdownContent>
            <DropdownItem>Configuracion</DropdownItem>
            <LineItem></LineItem>
            <DropdownItem onClick={() => CerrarSesion()}>
              Cerrar Sesion
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
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
          <Perfiles>
            <Avatar src={DataUser?.photoUrl} />
          </Perfiles>
          <TextName>{RolSesion[1]}</TextName>
          <div onClick={() => ActiveMenu()}>
            <OptionsIcon />
          </div>
        </OptionContainer>
      </HeaderUP>
      <HeaderDOWN>
        <LineBreack onClick={() => RouteInitial()}>.../</LineBreack>
        {breackcompGroup != null && (
          <LineBreack onClick={() => RouteGroup(breackcompGroup?.id)}>
            {breackcompGroup?.name}
            <label>/</label>
          </LineBreack>
        )}
        {breackcomp && (
          <LineBreack onClick={() => RouteCabinet(breackcomp?.id)}>
            {breackcomp?.name}
          </LineBreack>
        )}
        {breackcompFolder != null && (
          <LineBreack onClick={() => RouteFolder()}>
            <label>/</label>
            {breackcompFolder}
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

const TextName = styled.h1`
  font-size: 1.5rem;
  margin: 0.5rem 0 1.5rem 0;
  color: var(--primaryColor);
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Perfiles = styled.div`
  display: flex;
  align-self: flex-end;
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

const Dropdown = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
`;

const DropdownContent = styled.div`
  position: absolute;
  border-radius: 10%;
  width: 120px;
  top: 1.7rem;
  left: 56rem;
  color: #f68a20;
  border: 1px solid #f68a20;
  background: white;
`;

const DropdownItem = styled.div`
  padding: 0.3rem;
  margin: 0.3rem;
  text-align: center;
  cursor: pointer;
  line-height: 1.2;
  padding-top: 0.5rem;
  color: #faac1c;
  font-weight: 600;
`;

const LineItem = styled.hr`
  width: 100%;
  background: #f68a20;
`;
