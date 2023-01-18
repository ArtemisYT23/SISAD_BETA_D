import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "./Icons";
import ElementIcon from "../../../../../Styles/IconsResourse";
import {
  getNameGlobalChange,
  setSaveElementBreak,
  setSaveElementBreakGroup,
} from "../../../../../redux/states/Name";
import {
  setOpenModalGroupUpdate,
  setOpenModalGroupDelete,
  setOpenModalHistoryViewElement,
} from "../../../../../redux/states/ActionCore";
import {
  setSelectedGroupCore,
  setFilterGroupsCore,
  setSelectedGroupCoreUpdate,
} from "../../../../../redux/states/Group";
import { getAllHistoryElementCore } from "../../../../../redux/states/History";
import UpdateGroup from "../../ContainerGroup/ModalesGroup/GroupUpdate";
import DeleteGroup from "../../ContainerGroup/ModalesGroup/GroupDelete";
import HistoryElement from "../../ContainerCabinet/ModalesCabinet/HistoryElement";

const GridMantentGroup = ({ element, name, id }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { userSesion } = useSelector((store) => store);
  const { RolSesion, OptionsTocken } = userSesion;
  const [update, setUpdate] = useState(false);
  const [delet, setDelet] = useState(false);

  const Envio = (index, name) => {
    setShowMenu(false);
    dispatch(getNameGlobalChange(name));
    dispatch(setSelectedGroupCore(index));
    dispatch(setFilterGroupsCore(index));
    dispatch(setSaveElementBreakGroup(index));
  };

  const Enrutamiento = (path) => {
    dispatch(setSaveElementBreak(path));
  };

  const dropdownCabinet = (index) => {
    dispatch(setSelectedGroupCoreUpdate(index));
    setShowMenu(!showMenu);

    OptionsTocken.map((n, i) => {
      //actualizar grupo
      if (n.id == "4f8268a2-7ac3-4663-ad4f-71cadf48ad14") {
        setUpdate(true);
      }
      //eliminar grupo
      if (n.id == "95be3580-74bf-4b4b-81d8-c58f9faf8fb5") {
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

  const AbrirModalActualizarGroup = () => {
    dispatch(setOpenModalGroupUpdate(true));
  };

  const AbrirModalEliminarGroup = () => {
    dispatch(setOpenModalGroupDelete(true));
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
            {update ? (
              <>
                <DropdownItem onClick={() => AbrirModalActualizarGroup(id)}>
                  Renombrar
                </DropdownItem>
                <UpdateGroup />
                <LineItem></LineItem>
              </>
            ) : (
              <></>
            )}

            {delet ? (
              <>
                <DropdownItem onClick={() => AbrirModalEliminarGroup(id)}>
                  Eliminar
                </DropdownItem>
                <DeleteGroup />
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

      {RolSesion[2] != "Administrator" ? (
        <ElementIcon element={element} />
      ) : (
        <></>
      )}

      {RolSesion[2] == "Administrator" ? (
        <ElementIcon element={element} />
      ) : (
        <></>
      )}
      <ElementName>{name}</ElementName>
    </GridElemmentContainer>
  );
};

export default GridMantentGroup;

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
  cursor: pointer;
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
