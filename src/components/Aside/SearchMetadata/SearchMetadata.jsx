import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "../Search/Icons";
import { setSelectedCabinetCore } from "../../../redux/states/Cabinet";
import {
  setFilterFoldersCore,
  clearFolderMetaSelected,
  setFolderChildCore,
} from "../../../redux/states/Folder";
import { getMetadataByCabinet } from "../../../redux/states/Metadata";
import { getNameGlobalChange } from "../../../redux/states/Name";
import { getFilterIndexNameConfig } from "../../../redux/states/Indexes";
import ItemFolder from "./ItemFolder/ItemFolder";
import LoadingSpinner from "../../../utilities/LoadingSpinner";

const SearchMetadata = () => {
  const dispatch = useDispatch();
  const { cabinetCore, folderCore, documentary } = useSelector(
    (store) => store
  );
  const { isLoadingCabinet, SelectedCabinet, cabinets } =
    cabinetCore;
  const { folderCabinet } = folderCore;
  const { referent } = documentary;

  const setOptionsCabinet = (index, viewMode) => {
    viewMode
      ? cabinets.forEach((cab, i) => {
          if (cab.id == index) {
            dispatch(getFilterIndexNameConfig(cab.name));
            dispatch(setFilterFoldersCore(cab.id));
            dispatch(setSelectedCabinetCore(cab.id));
            dispatch(clearFolderMetaSelected());
            dispatch(getNameGlobalChange(cab.name));
            //dispatch(getMetadataByCabinet(cab.id));
            dispatch(setFolderChildCore());
          }
        })
      : cabinets.forEach((cab, i) => {
          if (cab.id == index) {
            dispatch(setFilterFoldersCore(cab.id));
            dispatch(setSelectedCabinetCore(cab.id));
            dispatch(clearFolderMetaSelected());
            dispatch(getNameGlobalChange(cab.name));
            dispatch(setFolderChildCore());
          }
        });
  };

  return (
    <SearchContainer>
      <ul>
        {isLoadingCabinet ? (
          <LoadingSpinner />
        ) : (
          <List>
            <Titulo>Gabinetes</Titulo>
            {cabinets ? (
              cabinets.map((cab, i) => (
                <div key={cab.id}>
                  <Celda
                    onClick={() => setOptionsCabinet(cab.id, cab.viewMode)}
                  >
                    <Icons>
                      <IconSearch element="cabinet" />
                    </Icons>
                    <Name>{cab.name}</Name>
                  </Celda>
                  {SelectedCabinet?.id === cab.id && (
                    <ContainerFolder>
                      {folderCabinet.map((fol, i) => (
                        <ItemFolder
                          key={i}
                          id={fol.id}
                          name={fol.name}
                          cabinetId={fol.cabinetId}
                        />
                      ))}
                    </ContainerFolder>
                  )}
                </div>
              ))
            ) : (
              <></>
            )}
          </List>
        )}
      </ul>
    </SearchContainer>
  );
};

export default SearchMetadata;

const SearchContainer = styled.div`
  width: 13.3rem;
  height: 100vh;
  display: flex;
  overflow-y: scroll;
  justify-content: center;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.li`
  text-decoration: none;
  list-style: none;
`;

const Titulo = styled.span`
  font-weight: 600;
  text-align: center left;
  text-decoration: none;
  font-size: 1.1rem;
  line-height: 2.2;
  position: flex;
  padding: 0.5rem;
  color: var(--primaryColor);
  display: flex;
  align-items: center;
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

const Icons = styled.div`
  display: flex;
  margin: 0 0.3rem 0 0.8rem;
`;

const Name = styled.span`
  font-size: 0.9rem;
  padding: 0.3rem;
`;

const ContainerFolder = styled.div`
  margin: 0.6rem 0 0.6rem 1rem;
`;
