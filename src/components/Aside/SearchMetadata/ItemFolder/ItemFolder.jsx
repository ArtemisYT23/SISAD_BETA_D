import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CarpIcons } from "./Icons";
import {
  setSelectedFolderMetadataCore,
  setFilterFoldersFatherCore,
  clearFolderMetaSelected,
} from "../../../../redux/states/Folder";
import { getNameGlobalChange } from "../../../../redux/states/Name";
import {
  getFileTypeByFolder,
  getTypeFileByCabinet,
} from "../../../../redux/states/FileType";

import { getMetadataByCabinet } from "../../../../redux/states/Metadata";
import { getFilterIndexNameConfig } from "../../../../redux/states/Indexes";

const ItemFolder = ({ id, name, cabinetId }) => {
  const dispatch = useDispatch();
  const { folderCore, cabinetCore, documentary } = useSelector(
    (store) => store
  );
  const { folderByFolder } = folderCore;
  const { cabinets } = cabinetCore;
  const { referent } = documentary;

  const SelectedFolderMeta = (index, name, cabinetId) => {
    dispatch(getNameGlobalChange(name));
    dispatch(setFilterFoldersFatherCore(index));
    dispatch(setSelectedFolderMetadataCore(index));

    cabinets.forEach((cab, i) => {
      if (cab.id == cabinetId) {
        dispatch(getMetadataByCabinet(cab.id));
        dispatch(getFilterIndexNameConfig(cab.name));
        // dispatch(getTypeFileByCabinet(cab.id));
        // dispatch(clearFolderMetaSelected());
        referent.current.api.setFilterModel(null);
      }
    });
  };

  const SelectedFileFolder = (index) => {
    folderByFolder.map((folder, i) => {
      document.getElementById(folder.id).style.backgroundColor = "#fdfdfd";
      document.getElementById(folder.id).style.color = "#c4c4c4";
      if (folder.id === index) {
        document.getElementById(index).style.backgroundColor = "#F68A20";
        document.getElementById(index).style.color = "#ffffff";
        dispatch(getFileTypeByFolder(index));
      }
    });
  };

  return (
    <>
      <ContainerItemTree
        onClick={(e) => SelectedFolderMeta(id, name, cabinetId)}
      >
        <ContentItem>
          <ContainerIcons>
            <CarpIcons x={24} y={24} />
          </ContainerIcons>
          <ContainerTitle>
            <TitleCap>{name}</TitleCap>
          </ContainerTitle>
        </ContentItem>
      </ContainerItemTree>
      <ContentItemChild>
        {folderByFolder ? (
          folderByFolder.map((folder, i) => (
            <ContentItem
              id={folder.id}
              onClick={() => SelectedFileFolder(folder.id)}
            >
              <ContainerIcons>
                <CarpIcons x={24} y={24} />
              </ContainerIcons>
              <ContainerTitle>
                <TitleCap>{folder.name}</TitleCap>
              </ContainerTitle>
            </ContentItem>
          ))
        ) : (
          <></>
        )}
      </ContentItemChild>
    </>
  );
};

export default ItemFolder;

const ContainerItemTree = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  margin: 0 0 0.4rem 0;
  cursor: pointer;
`;

const ContentItem = styled.div`
  display: flex;
  width: 100%;
  color: var(--lineColor);
`;

const ContainerIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

const ContainerTitle = styled.div`
  display: flex;
  width: 80%;
`;

const TitleCap = styled.h1`
  font-size: 0.8rem;
  margin: 0.2rem;
  font-weight: 600;
`;

const ContentItemChild = styled.div`
  margin: 0 0 0 1.5rem;
  cursor: pointer;
`;
