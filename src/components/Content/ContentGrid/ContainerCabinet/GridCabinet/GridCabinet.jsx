import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "./Icons";
import ElementIcon from "../../../../../Styles/IconsResourse";
import {
  getNameGlobalChange,
  setSaveElementBreak,
} from "../../../../../redux/states/Name";
import {
  setOpenModalCabinetUpdate,
  setOpenModalCabinetDelete,
  setOpenModalHistoryViewElement,
} from "../../../../../redux/states/ActionCore";
import {
  setSelectedCabinetUpdateCore,
  setSelectedCabinetCore,
} from "../../../../../redux/states/Cabinet";
import { setFilterFoldersCore } from "../../../../../redux/states/Folder";
import { getAllHistoryElementCore } from "../../../../../redux/states/History";
import { getTypeFileByCabinet } from "../../../../../redux/states/FileType";
import { getIndexAllCabinetConfig } from "../../../../../redux/states/Indexes";
import { getMetadataByCabinet } from "../../../../../redux/states/Metadata";
import CabinetUpdate from "../ModalesCabinet/CabinetUpdate";
import CabinetDelete from "../ModalesCabinet/CabinetDelete";
import HistoryElement from "../ModalesCabinet/HistoryElement";
import { Tooltip } from "@material-ui/core";

const GridCabinet = ({
  element,
  name,
  description,
  groupId,
  id,
  fileTypes,
}) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { userSesion } = useSelector((store) => store);
  const { RolSesion, OptionsTocken } = userSesion;
  const [update, setUpdate] = useState(false);
  const [delet, setDelet] = useState(false);
  const [inde, setInde] = useState(false);

  const Envio = (index, name) => {
    setShowMenu(false);
    dispatch(getNameGlobalChange(name));
    dispatch(setSelectedCabinetCore(index));
    dispatch(setFilterFoldersCore(index));
    // dispatch(getMetadataByCabinet(index));
  };

  const Enrutamiento = (path) => {
    dispatch(setSaveElementBreak(path));
  };

  const dropdownCabinet = (index) => {
    dispatch(setSelectedCabinetUpdateCore(index));
    setShowMenu(!showMenu);

    OptionsTocken.map((n, i) => {
      //consultar indice
      if (n.id == "2afc517d-7647-4933-a64a-d3f2bf1fb7ae") {
        setInde(true);
      }
      //actualizar gabinete
      if (n.id == "1f69e2c7-d7ab-42c5-90ac-40a541b8c9f3") {
        setUpdate(true);
      }
      //eliminar gabinete
      if (n.id == "f9db0e9e-e89e-4b5e-a83e-2b638ceed35c") {
        setDelet(true);
      }
    });

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
    dispatch(getTypeFileByCabinet(id));
  };

  const AbrirModalEliminarCabinet = (id) => {
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
            {inde ? (
              <>
                <DropdownItem onClick={() => AbrilModalIndexCreated(name)}>
                  Configurar
                </DropdownItem>
              </>
            ) : (
              <></>
            )}

            {update ? (
              <>
                <LineItem></LineItem>
                <DropdownItem onClick={() => AbrirModalActualizarCabinet(id)}>
                  Renombrar
                </DropdownItem>

                <CabinetUpdate />
              </>
            ) : (
              <></>
            )}

            {delet ? (
              <>
                <LineItem></LineItem>
                <DropdownItem onClick={() => AbrirModalEliminarCabinet(id)}>
                  Eliminar
                </DropdownItem>
                <CabinetDelete />
                <LineItem></LineItem>
              </>
            ) : (
              <></>
            )}

            {RolSesion[2] == "Administrator" && (
              <>
                <DropdownItem
                  onClick={() => AbriModalHistoryElement(id, RolSesion[0])}
                >
                  Historial
                </DropdownItem>
                <HistoryElement />
              </>
            )}
          </DropdownContent>
        </Dropdown>
      )}

      <Tooltip title="Opciones">
        <ContainerIcon onClick={() => dropdownCabinet(id)}>
          <Options x={19} y={19} fill={"#F68A20"} />
        </ContainerIcon>
      </Tooltip>
      <ContainerItem>
        <ElementIcon element={element} />
        <br />
        <Tooltip title={name}>
        <ElementName>{name}</ElementName>
        </Tooltip>
      </ContainerItem>
    </GridElemmentContainer>
  );
};
export default GridCabinet;

const ContainerItem = styled.div`
  width: 100%;
  height: 76%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    height: 76%;
  }
`;

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
  @media (max-width: 767px) {
    width: 130px;
    height: 140px;
    margin: 0.5rem;
  }
`;

const ContainerIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  cursor: pointer;
  z-index: 2;
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
