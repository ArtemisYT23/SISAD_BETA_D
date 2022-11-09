import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElementIcon from "../../../../../Styles/IconsResourse";
import { Options } from "./Icons";
import {
  setOpenModalFolderUpdate,
  setOpenModalFolderDelete,
  setCloseContextFolder,
  setOpenModalHistoryViewElement,
} from "../../../../../redux/states/ActionCore";
import {
  getNameGlobalChange,
  setSaveElementBreakFolder,
} from "../../../../../redux/states/Name";
import { setSelectedSearchMetadataCore } from "../../../../../redux/states/View";
import { getAllHistoryElementCore } from "../../../../../redux/states/History";
import {
  setSelectedFolderUpdateCore,
  setSelectedFolderCore,
} from "../../../../../redux/states/Folder";
import { getFilesByFolderAll } from "../../../../../redux/states/Files"
import { setFilterDocumentDocu } from "../../../../../redux/states/Document";
import { getTypeFileByFolderFolder } from "../../../../../redux/states/FileType";
import { getIndexAllCabinetPreview } from "../../../../../redux/states/Indexes";
import { setClearMetadataSelected } from "../../../../../redux/states/Metadata";
import HistoryElement from "../../ContainerCabinet/ModalesCabinet/HistoryElement";
import FolderUpdate from "../ModalesFolder/FolderUpdate";
import FolderDelete from "../ModalesFolder/FolderDelete";

const GridFolder = ({ element, name, description, id, cabinetId }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { userSesion } = useSelector((store) => store);
  const { RolSesion } = userSesion;

  const Envio = (index, name, cabinetId) => {
    setShowMenu(false);
    dispatch(setFilterDocumentDocu(index));
    dispatch(setSelectedFolderCore(index));
    dispatch(getNameGlobalChange(name));
    dispatch(setSelectedSearchMetadataCore());
    dispatch(setCloseContextFolder(false));
    dispatch(getIndexAllCabinetPreview(cabinetId));
    dispatch(getFilesByFolderAll(index));
    dispatch(setClearMetadataSelected());
  };

  const Enrutamiento = (name) => {
    dispatch(setSaveElementBreakFolder(name));
  };

  const dropdownCabinet = (index) => {
    dispatch(setSelectedFolderUpdateCore(index));
    dispatch(getTypeFileByFolderFolder(index));
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

  const AbrirModalUpdateFolder = (id) => {
    dispatch(setOpenModalFolderUpdate(true));
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
              <DropdownItem
                onClick={() => {
                  AbrirModalUpdateFolder(id);
                }}
              >
                Actualizar
              </DropdownItem>

              <FolderUpdate />
              <LineItem></LineItem>
              <DropdownItem onClick={() => AbrirModalDeleteFolder()}>
                Eliminar
              </DropdownItem>
              <FolderDelete />

              <LineItem></LineItem>
              <DropdownItem
                onClick={() => AbriModalHistoryElement(id, RolSesion[0])}
              >
                Detalles
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

        {RolSesion[2] == "Writer" && (
          <ContainerIcon onClick={() => dropdownCabinet(id)}>
            <Options x={20} y={20} fill={"#F68A20"} />
          </ContainerIcon>
        )}

        <ElementIcon element={element} />
        <ElementName>{name}</ElementName>
      </GridElemmentContainer>
    </>
  );
};

export default GridFolder;

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
