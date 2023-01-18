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
import { getFilterIndexNameConfig } from "../../../redux/states/Indexes";
import { getTypeFileByCabinet } from "../../../redux/states/FileType";
import { getNameGlobalChange } from "../../../redux/states/Name";
import ItemFolder from "./ItemFolder/ItemFolder";

const SearchMetadata = () => {
  const dispatch = useDispatch();
  const { cabinetCore, folderCore, documentary } = useSelector(
    (store) => store
  );
  const { cabinetFolder, isLoadingCabinet, SelectedCabinet, cabinets } =
    cabinetCore;
  const { folderCabinet } = folderCore;
  const { referent } = documentary;
  const [term, setTerm] = useState("");

  const setOptionsCabinet = (index) => {
    cabinets.forEach((cab, i) => {
      if (cab.id == index) {
        dispatch(setFilterFoldersCore(cab.id));
        dispatch(setSelectedCabinetCore(cab.id));
        // dispatch(getMetadataByCabinet(cab.id));
        // dispatch(getFilterIndexNameConfig(cab.name));
        // dispatch(getTypeFileByCabinet(cab.id));
        dispatch(clearFolderMetaSelected());
        // referent.current.api.setFilterModel(null);
        dispatch(getNameGlobalChange(cab.name));
        dispatch(setFolderChildCore());
      }
    });
  };

  function searchingTerm(term) {
    return function (x) {
      return x.name.toLowerCase().includes(term) || !term;
    };
  }

  return (
    <SearchContainer>
      <ul>
        {isLoadingCabinet ? (
          <LoadingSpinner />
        ) : (
          <List>
            <Titulo>Gabinetes</Titulo>
            <SearchUser
              placeholder=" Buscar Gabinete"
              onChange={(e) => setTerm(e.target.value)}
            />
            {cabinetFolder ? (
              cabinetFolder.filter(searchingTerm(term)).map((cab, i) => (
                <div key={cab.id}>
                  <Celda onClick={() => setOptionsCabinet(cab.id)}>
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

const SearchUser = styled.input`
  width: 100%;
  height: 1.8rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
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
