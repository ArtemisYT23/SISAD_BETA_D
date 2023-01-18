import styled from "styled-components";
import IconSearch from "./Icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterFoldersFatherCore,
  setSelectedFolderCore,
  setSelectedFolderChildCore,
} from "../../../redux/states/Folder";
import { getFileTypeByFolder } from "../../../redux/states/FileType";
import {
  getMetadataByCabinet,
  setClearMetadataSelected,
} from "../../../redux/states/Metadata";
import { setFilterDocumentDocu } from "../../../redux/states/Document";
import { getFilesByFolderAll } from "../../../redux/states/Files";
import {
  getNameGlobalChange,
  setSaveElementBreakFolder,
} from "../../../redux/states/Name";
import { setSelectedSearchTreeCore } from "../../../redux/states/View";
import { setCloseContextFolder } from "../../../redux/states/ActionCore";
import { setOpenDetalleModal } from "../../../redux/states/ActionDocumentary";

const ItemCelda = ({ id, name, element, cabinetId }) => {
  const dispatch = useDispatch();
  const { folderCore } = useSelector((store) => store);
  const { folderByFolder } = folderCore;

  const selectFather = (index, name, cabinetId) => {
    dispatch(setSelectedFolderCore(index));
    dispatch(setFilterFoldersFatherCore(index));
    dispatch(setSaveElementBreakFolder(index));
    dispatch(getNameGlobalChange(name));
    dispatch(getMetadataByCabinet(cabinetId));
    dispatch(setSelectedSearchTreeCore());
    dispatch(setClearMetadataSelected());
    dispatch(setCloseContextFolder(false));
    dispatch(setOpenDetalleModal(false));
  };

  const selectChild = (index, fileId) => {
    folderByFolder.map((folder, i) => {
      document.getElementById(folder.id).style.backgroundColor = "#fdfdfd";
      document.getElementById(folder.id).style.color = "#c4c4c4";
      if (folder.id === index) {
        document.getElementById(index).style.backgroundColor = "#F68A20";
        document.getElementById(index).style.color = "#ffffff";
        dispatch(getFileTypeByFolder(index));
        dispatch(setSelectedFolderChildCore(index));
        dispatch(getFilesByFolderAll(fileId));
        dispatch(setFilterDocumentDocu(fileId));
      }
    });
  };

  return (
    <>
      <Celda onClick={() => selectFather(id, name, cabinetId)}>
        <Icons>
          <IconSearch element={element} />
        </Icons>
        <Name>{name}</Name>
      </Celda>
      <ContentItemChild>
        {folderByFolder ? (
          folderByFolder.map((folder, i) => (
            <CeldaChild id={folder.id} onClick={() => selectChild(folder.id, folder.folderId)}>
              <Icons>
                <IconSearch element={element} />
              </Icons>
              <Name>{folder.name}</Name>
            </CeldaChild>
          ))
        ) : (
          <></>
        )}
      </ContentItemChild>
    </>
  );
};

export default ItemCelda;

const Icons = styled.div`
  display: flex;
  margin: 0 0.3rem 0 0.8rem;
`;

const Name = styled.span`
  font-size: 0.9rem;
  padding: 0.3rem;
`;

const Celda = styled.div`
  color: var(--lineColor);
  text-decoration: none;
  font-size: 1.3rem;
  display: flex;
  cursor: pointer;
  margin: 0.4rem 0 0.4rem 0;
  align-items: center;
  text-align: left;
`;

const ContentItemChild = styled.div`
  margin: 0 0 0 1.5rem;
  cursor: pointer;
`;

const CeldaChild = styled.div`
  color: var(--lineColor);
  text-decoration: none;
  font-size: 1.3rem;
  display: flex;
  margin: 0.4rem 0 0.4rem 0;
  align-items: center;
  text-align: left;
`;
