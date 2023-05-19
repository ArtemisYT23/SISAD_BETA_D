import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getFileTypeByFolder,
  setCountFileTypeByDocument,
  setCountFileTypeByDocumentJerarquique,
  setCountFileDocument,
} from "../../../../redux/states/FileType";
import {
  setFilterFoldersFatherCore,
  setSelectedFolderMetadataCore,
  setSelectedFolderCore,
  setSelectedFolderPrimaryCore,
  setSelectedFolderChildCore,
  setFolderChildCore,
} from "../../../../redux/states/Folder";
import { getNameGlobalChange } from "../../../../redux/states/Name";
import { CarpIcons } from "./Icons";
import {
  setDetailByFolderDocument,
  setDetailsByDocument,
} from "../../../../redux/states/Document";
import { getFilterIndexNameConfig } from "../../../../redux/states/Indexes";
import {
  getMetadataByCabinet,
  getMetadataByCabinetFilter,
  setMetadataByDocument,
} from "../../../../redux/states/Metadata";
import { DocumentServer } from "../../../../config/axios";

const ItemFolder = ({ id, name, cabinetId }) => {
  const dispatch = useDispatch();
  const { folderCore, cabinetCore, sesion } = useSelector((store) => store);
  const { folderByFolder, SelectedFolderMeta, SelectedFolder, folders } =
    folderCore;
  const { cabinets, SelectedCabinet } = cabinetCore;
  const { TockenUser } = sesion;

  const HumanResource = async (index, cabinetId, cabinetName) => {
    const apiConfig = {
      baseURL: `${DocumentServer}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TockenUser}`,
      },
    };

    const requests = [
      axios.get(`datedocmetacountfile/${index}/0/20000`, apiConfig),
      axios.get(
        `getalldocumentcountFileType/00000000-0000-0000-0000-000000000000/${index}/0/20000`,
        apiConfig
      ),
      axios.get(`metadatabycabinet/${cabinetId}/0/20000`, apiConfig)
    ];

    const results = await Promise.allSettled(requests);

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        // console.log(`Request ${index + 1} succeeded:`, result.value.data);
        if (index === 0) {
          dispatch(setDetailsByDocument(result.value.data));
        }
        if (index === 1) {
          dispatch(setCountFileDocument(result.value.data));
        }
        if (index === 2) {
          dispatch(setMetadataByDocument(result.value.data));
        }
      }
      // } else {
      //   console.log(`Request ${index + 1} failed:`, result.value.data);
      // }
    });
  };

  const EstructureResourceHuman = (index, name, cabinetId) => {
    dispatch(getNameGlobalChange(name));
    dispatch(setFilterFoldersFatherCore(index));
    dispatch(setSelectedFolderMetadataCore(index));

    // dispatch(setDetailByFolderDocument(index));
    // dispatch(setCountFileTypeByDocument(index));
    cabinets.forEach((cab, i) => {
      if (cab.id == cabinetId) {
        dispatch(getFilterIndexNameConfig(cab.name));
        HumanResource(index, cab.id, cab.name);
        // dispatch(getMetadataByCabinet(cab.id));
      }
    });
  };

  const EstructureJerarquique = (index, name, cabinetId) => {
    const folderOrder = folders.filter((folder) => folder.folderId === index);
    if (folderOrder.length > 0) {
      // console.log("Tiene Hijas");
      dispatch(setCountFileTypeByDocumentJerarquique(index));
      dispatch(setFilterFoldersFatherCore(index));
      dispatch(setSelectedFolderCore(index));
      dispatch(getNameGlobalChange(name));
      dispatch(setSaveElementBreakFolder(index));
      dispatch(setClearMetadataSelected());
      cabinets.forEach((cab, i) => {
        if (cab.id === cabinetId) {
          dispatch(getMetadataByCabinet(cab.id));
        }
      });
    }

    if (folderOrder.length <= 0) {
      console.log("Es Unica");
      dispatch(setDetailByFolderDocument(index));
      dispatch(setSelectedFolderPrimaryCore(index));
      dispatch(setCountFileTypeByDocumentJerarquique(index));
      dispatch(getNameGlobalChange(name));
      dispatch(setFolderChildCore());
      cabinets.forEach((cab, i) => {
        if (cab.id === cabinetId) {
          //dispatch(getMetadataByCabinet(cab.id));
          dispatch(getMetadataByCabinetFilter(index));
        }
      });
    }
  };

  const SelectedFolderMetadata = (index, name, cabinetId, viewMode) => {
    viewMode
      ? EstructureJerarquique(index, name, cabinetId)
      : EstructureResourceHuman(index, name, cabinetId);
  };

  const SelectedFileFolder = (index, viewMode) => {
    folderByFolder.map((folder, i) => {
      document.getElementById(folder.id).style.backgroundColor = "#fdfdfd";
      document.getElementById(folder.id).style.color = "#c4c4c4";

      if (viewMode == false) {
        if (folder.id === index) {
          document.getElementById(index).style.backgroundColor = "#F68A20";
          document.getElementById(index).style.color = "#ffffff";
          dispatch(getFileTypeByFolder(index));
        }
      }

      if (viewMode == true) {
        document.getElementById(index).style.backgroundColor = "#F68A20";
        document.getElementById(index).style.color = "#ffffff";
        dispatch(getMetadataByCabinetFilter(index));
        dispatch(setDetailByFolderDocument(index));
        dispatch(getFileTypeByFolder(index));
        dispatch(setSelectedFolderChildCore(index));
        dispatch(getNameGlobalChange(name));
      }
    });
  };

  return (
    <>
      <ContainerItemTree
        onClick={(e) =>
          SelectedFolderMetadata(id, name, cabinetId, SelectedCabinet?.viewMode)
        }
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
      {SelectedFolderMeta?.id == id && (
        <ContentItemChild>
          {folderByFolder ? (
            folderByFolder.map((folder, i) => (
              <ContentItem
                id={folder.id}
                onClick={() =>
                  SelectedFileFolder(folder.id, SelectedCabinet?.viewMode)
                }
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
      )}
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
