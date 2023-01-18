import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElementIcon from "../../../../../Styles/IconsResourse";
import { Options } from "./Icons";
import {
  setOpenModalFolderUpdate,
  setOpenModalFolderDelete,
  setCloseContextFolder,
  setCloseContextChild,
  setOpenModalHistoryViewElement,
} from "../../../../../redux/states/ActionCore";
import {
  getNameGlobalChange,
  setSaveElementBreackFolderChild,
} from "../../../../../redux/states/Name";
import { setSelectedSearchMetadataCore } from "../../../../../redux/states/View";
import { getAllHistoryElementCore } from "../../../../../redux/states/History";
import {
  setSelectedFolderUpdateCore,
  setSelectedFolderChildCore,
} from "../../../../../redux/states/Folder";
import { getFilesByFolderAll } from "../../../../../redux/states/Files";
import { setFilterDocumentDocu } from "../../../../../redux/states/Document";
import { getTypeFileByFolderFolder, getFileTypeByFolder } from "../../../../../redux/states/FileType";
import { getFilterIndexNameConfig } from "../../../../../redux/states/Indexes";
import { setClearMetadataSelected } from "../../../../../redux/states/Metadata";
import HistoryElement from "../../ContainerCabinet/ModalesCabinet/HistoryElement";
import FolderUpdate from "../../ContainerFolder/ModalesFolder/FolderUpdate";
import FolderDelete from "../../ContainerFolder/ModalesFolder/FolderDelete";
import { Tooltip } from "@material-ui/core";

const GridChild = ({ element, name, description, id, cabinetId }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { userSesion, cabinetCore } = useSelector((store) => store);
  const { RolSesion, OptionsTocken } = userSesion;
  const { cabinets } = cabinetCore;
  const [update, setUpdate] = useState(false);
  const [delet, setDelet] = useState(false);

  const Envio = (index, name, cabinetId) => {
    setShowMenu(false);
    dispatch(getFileTypeByFolder(index));
    // dispatch(setFilterDocumentDocu(index));
    dispatch(setSelectedFolderChildCore(index));
    dispatch(getNameGlobalChange(name));
    // dispatch(setSelectedSearchMetadataCore());
    dispatch(setCloseContextChild(false));
    // dispatch(getFilesByFolderAll(index));
    // dispatch(setClearMetadataSelected());
    cabinets.forEach((cab, i) => {
      if (cab.id === cabinetId) {
        dispatch(getFilterIndexNameConfig(cab.name));
      }
    });
  };

  const Enrutamiento = (name) => {
    dispatch(setSaveElementBreackFolderChild(name));
  };

  const dropdownCabinet = (index) => {
    dispatch(setSelectedFolderUpdateCore(index));
    setShowMenu(!showMenu);

    OptionsTocken.map((n, i) => {
      //actualizar carpeta
      if (n.id == "08d51e45-9699-4955-bd8c-c111bac8a0f4") {
        setUpdate(true);
      }
      //eliminar carpeta
      if (n.id == "0959912c-700e-484a-beab-147de142448f") {
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

  const AbrirModalUpdateFolder = (id) => {
    dispatch(setOpenModalFolderUpdate(true));
    dispatch(getTypeFileByFolderFolder(id));
  };

  const AbrirModalDeleteFolder = () => {
    dispatch(setOpenModalFolderDelete(true));
  };

  const AbriModalHistoryElement = (id, userId) => {
    dispatch(setOpenModalHistoryViewElement(true));
    dispatch(getAllHistoryElementCore(id, userId));
  };

  return (
    <>
      <GridElemmentContainer
        id={id}
        onDoubleClick={() => {
          Envio(id, name, cabinetId), Enrutamiento(name);
        }}
      >
        {showMenu && (
          <Dropdown className="dropdown">
            <DropdownContent>
              {update ? (
                <>
                  <DropdownItem
                    onClick={() => {
                      AbrirModalUpdateFolder(id);
                    }}
                  >
                    Actualizar
                  </DropdownItem>

                  <FolderUpdate />
                  <LineItem></LineItem>
                </>
              ) : (
                <></>
              )}

              {delet ? (
                <>
                  <DropdownItem onClick={() => AbrirModalDeleteFolder()}>
                    Eliminar
                  </DropdownItem>
                  <FolderDelete />

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
            <Options x={20} y={20} fill={"#F68A20"} />
          </ContainerIcon>
        </Tooltip>

        <ContainerItem>
          <ElementIcon element={element} />
          <ElementName>{name}</ElementName>
        </ContainerItem>
      </GridElemmentContainer>
    </>
  );
};

export default GridChild;

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
