import {
  List,
  Rec,
  SearchContainer,
  SearchInput,
  Titulo,
} from "../../../Styles/DocumentaryStyles/SearchStyles";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import ItemCelda from "./ItemCelda";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setFilterGroupsCore,
  setSelectedGroupCore,
} from "../../../redux/states/Group";
import { setSelectedCabinetCore } from "../../../redux/states/Cabinet";
import {
  setFilterFoldersCore,
  setSelectedFolderCore,
} from "../../../redux/states/Folder";
import {
  setSaveElementBreakGroup,
  getNameGlobalChange,
  setSaveElementBreak,
  setClearElementFolderBreak,
  setSaveElementBreakFolder,
} from "../../../redux/states/Name";
import { setFilterDocumentDocu } from "../../../redux/states/Document";
import { setSelectedSearchTreeCore } from "../../../redux/states/View";
import { setCloseContextFolder } from "../../../redux/states/ActionCore";
import { setFileCleanerAllDocument } from "../../../redux/states/Files";
import { getMetadataByCabinet, setClearMetadataSelected } from "../../../redux/states/Metadata";
import { setOpenDetalleModal } from "../../../redux/states/ActionDocumentary";

const Search = () => {
  const dispatch = useDispatch();
  const { groupCore, cabinetCore, folderCore } = useSelector((store) => store);
  const { groups, isLoadingGroup } = groupCore;
  const { cabinets, isLoadingCabinet } = cabinetCore;
  const { folderCabinet } = folderCore;

  const setOptionsGroup = (id, name) => {
    dispatch(setFilterGroupsCore(id, name));
    dispatch(setSaveElementBreakGroup(id));
    dispatch(setSelectedGroupCore(id));
    dispatch(getNameGlobalChange(name));
    dispatch(setOpenDetalleModal(false));
  };

  const setOptionsCabinet = (id, name) => {
    dispatch(setSelectedCabinetCore(id));
    dispatch(setFilterFoldersCore(id));
    dispatch(getNameGlobalChange(name));
    dispatch(setSaveElementBreak(id));
    dispatch(getMetadataByCabinet(id));
    dispatch(setSelectedSearchTreeCore());
    dispatch(setClearElementFolderBreak());
    dispatch(setFileCleanerAllDocument());
    dispatch(setCloseContextFolder(false));
    dispatch(setOpenDetalleModal(false));
  };

  const setOptionsFolder = (id, name, cabinetId) => {
    dispatch(setSelectedFolderCore(id));
    dispatch(setFilterDocumentDocu(id));
    dispatch(getNameGlobalChange(name));
    dispatch(setSaveElementBreakFolder(name));
    dispatch(setSelectedSearchTreeCore());
    dispatch(setClearMetadataSelected());
    dispatch(getMetadataByCabinet(cabinetId));
    dispatch(setCloseContextFolder(false));
    dispatch(setOpenDetalleModal(false));
  };

  const [Search, setSearch] = useState("");

  const BusquedaGlobal = (name) => {
    setSearch(name);
  };

  const Submit = (e) => {
    e.preventDefault();
  };

  return (
    <SearchContainer>
      <form onSubmit={Submit}>
        <SearchInput
          placeholder="Buscar"
          onChange={(e) => BusquedaGlobal(e.target.value)}
        />
      </form>
      <ul>
        {isLoadingGroup ? (
          <LoadingSpinner />
        ) : (
          <List>
            <Titulo>Grupos</Titulo>
            {groups ? (
              groups.map(({ id, name }) => (
                <div key={id} onClick={() => setOptionsGroup(id, name)}>
                  <ItemCelda index={id} id={id} name={name} element="group" />
                </div>
              ))
            ) : (
              <></>
            )}
          </List>
        )}
        <List>
          <Rec />
        </List>
        {isLoadingCabinet ? (
          <LoadingSpinner />
        ) : (
          <List>
            <Titulo>Gabinetes</Titulo>
            {cabinets ? (
              cabinets.map(({ id, name }) => (
                <div key={id} onClick={() => setOptionsCabinet(id, name)}>
                  <ItemCelda index={id} id={id} name={name} element="cabinet" />
                </div>
              ))
            ) : (
              <></>
            )}
          </List>
        )}
        <List>
          <Rec />
        </List>
        <List>
          <Titulo>Carpetas</Titulo>
          {folderCabinet ? (
            folderCabinet.map(({ id, name, cabinetId }) => (
              <div
                key={id}
                onClick={() => setOptionsFolder(id, name, cabinetId)}
              >
                <ItemCelda index={id} id={id} name={name} element="folder" />
              </div>
            ))
          ) : (
            <></>
          )}
        </List>
      </ul>
    </SearchContainer>
  );
};

export default Search;
