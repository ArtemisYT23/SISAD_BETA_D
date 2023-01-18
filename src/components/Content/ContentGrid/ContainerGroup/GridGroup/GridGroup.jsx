import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "./Icons";
import ElementIcon from "../../../../../Styles/IconsResourse";
import styled from "styled-components";
import {
  setOpenModalCabinetUpdate,
  setOpenModalCabinetDelete,
  setOpenModalHistoryViewElement,
} from "../../../../../redux/states/ActionCore";
import {
  getNameGlobalChange,
  setSaveElementBreak,
} from "../../../../../redux/states/Name";
import {
  setSelectedCabinetUpdateCore,
  setSelectedCabinetCore,
} from "../../../../../redux/states/Cabinet";
import { setFilterFoldersCore } from "../../../../../redux/states/Folder";
import { getMetadataByCabinet } from "../../../../../redux/states/Metadata";
import { getTypeFileByCabinet } from "../../../../../redux/states/FileType";
import { getIndexAllCabinetConfig } from "../../../../../redux/states/Indexes";
import { getAllHistoryElementCore } from "../../../../../redux/states/History";
import CabinetUpdate from "../../ContainerCabinet/ModalesCabinet/CabinetUpdate";
import CabinetDelete from "../../ContainerCabinet/ModalesCabinet/CabinetDelete";
import HistoryElement from "../../ContainerCabinet/ModalesCabinet/HistoryElement";

const GridGroup = ({ element, name, description, groupId, id, fileTypes }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { userSesion } = useSelector((store) => store);
  const { RolSesion } = userSesion;

  const Envio = (index, name) => {
    setShowMenu(false);
    dispatch(getNameGlobalChange(name));
    dispatch(setSelectedCabinetCore(index));
    dispatch(setFilterFoldersCore(index));
    dispatch(getMetadataByCabinet(index));
  };

  const Enrutamiento = (path) => {
    dispatch(setSaveElementBreak(path));
  };

  const dropdownCabinet = (index) => {
    dispatch(setSelectedCabinetUpdateCore(index));
    dispatch(getTypeFileByCabinet(index));
    setShowMenu(!showMenu);
    const collection = document.getElementsByClassName("dropdown");
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.display = "none";
      if (id === index) {
        setShowMenu(!showMenu);
        document.getElementById(index).style.display = "flex";
      }
    }
  };

  const AbrirModalActualizarCabinet = (id) => {
    dispatch(setOpenModalCabinetUpdate(true));
  };

  const AbrirModalEliminarCabinet = () => {
    dispatch(setOpenModalCabinetDelete(true));
  };

  const AbrilModalIndexCreated = (name) => {
    dispatch(getIndexAllCabinetConfig(name));
  };

  const AbriModalHistoryElement = (id, userId) => {
    dispatch(setOpenModalHistoryViewElement(true));
    dispatch(getAllHistoryElementCore(id, userId));
  };

  return (
    <GridElemmentContainer
      id={id}
      onDoubleClick={() => {
        Envio(id, name), Enrutamiento(id);
      }}
    >
      {showMenu && (
        <Dropdown className="dropdown">
          <DropdownContent>
            <DropdownItem onClick={() => AbrilModalIndexCreated(id)}>
              Configurar
            </DropdownItem>
            <LineItem></LineItem>
            <DropdownItem onClick={() => AbrirModalActualizarCabinet(id)}>
              Renombrar
            </DropdownItem>
            <CabinetUpdate />
            <LineItem></LineItem>
            <DropdownItem onClick={() => AbrirModalEliminarCabinet()}>
              Eliminar
            </DropdownItem>
            <CabinetDelete />
            <LineItem></LineItem>
            <DropdownItem
              onClick={() => AbriModalHistoryElement(id, RolSesion[0])}
            >
              Historial
            </DropdownItem>
            <HistoryElement />
          </DropdownContent>
        </Dropdown>
      )}

      {RolSesion[2] == "Administrator" && (
        <ContainerIcon onClick={() => dropdownCabinet(id)}>
          <Options x={20} y={20} fill={"#F68A20"} />
        </ContainerIcon>
      )}

      {RolSesion[2] != "Administrator" && (
        <ContainerIcon onClick={() => dropdownCabinet(id)}>
          <Options x={20} y={20} fill={"#F68A20"} />
        </ContainerIcon>
      )}

      {RolSesion[2] == "Administrator" ? (
        <ElementIcon element={element} />
      ) : (
        <></>
      )}

      {RolSesion[2] != "Administrator" ? <ElementIcon element={element} /> : <></>}

      <ElementName>{name}</ElementName>
    </GridElemmentContainer>
  );
};

export default GridGroup;

const GridElemmentContainer = styled.div`
  display: inline-flex;
  width: 10rem;
  height: 10rem;
  border-radius: 2rem;
  background-color: rgba(254, 206, 100, 0.35);
  margin: 2rem 0 0 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const ContainerIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ElementName = styled.h4`
  color: var(--primaryColor);
  font-size: 0.8rem;
  text-align: center;
  overflow: hidden;
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
  top: 1rem;
  left: 7rem;
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
