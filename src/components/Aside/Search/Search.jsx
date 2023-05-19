import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCloseContextFolder } from "../../../redux/states/ActionCore";
import { setOpenDetalleModal } from "../../../redux/states/ActionDocumentary";
import {
  setFilterCabinetsByName,
  setSelectedCabinetCore,
} from "../../../redux/states/Cabinet";
import { setFilterDocumentDocu } from "../../../redux/states/Document";
import {
  setFileCleanerAllDocument,
  setFilterFileByName,
  setFilterFileConfiguration,
} from "../../../redux/states/Files";
import {
  setFilterFoldersByName,
  setFilterFoldersCore,
  setSelectedFolderCore,
  setFolderChildCore,
} from "../../../redux/states/Folder";
import {
  setFilterGroupsCore,
  setSelectedGroupCore,
} from "../../../redux/states/Group";
import { getIndexAllCabinetPreview } from "../../../redux/states/Indexes";
import {
  getMetadataByCabinet,
  setClearMetadataSelected,
} from "../../../redux/states/Metadata";
import {
  getNameGlobalChange,
  setClearElementFolderBreak,
  setSaveElementBreak,
  setSaveElementBreakFolder,
  setSaveElementBreakGroup,
} from "../../../redux/states/Name";
import { setSelectedSearchTreeCore } from "../../../redux/states/View";
import {
  getStateNameFile,
  getStateDescriptionFile,
  getFileTypeSelectionData,
  getFileTypeFile,
} from "../../../redux/formData/FilterData";
import {
  List,
  Rec,
  SearchContainer,
  SearchInput,
  Titulo,
} from "../../../Styles/DocumentaryStyles/SearchStyles";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import IconSearch from "./icons";
import ItemCelda from "./ItemCelda";
import ItemFolder from "./ItemFolder";

const Search = () => {
  const dispatch = useDispatch();
  const {
    groupCore,
    cabinetCore,
    folderCore,
    modalCore,
    typeFileCore,
    filterData,
  } = useSelector((store) => store);
  const { isFilterFileType } = modalCore;
  const { TypeFile } = typeFileCore;
  const { groups, isLoadingGroup } = groupCore;
  const { cabinets, isLoadingCabinet } = cabinetCore;
  const { folderCabinet } = folderCore;
  const { nameFile, descriptionFile, text, fileTypeFile, fileTypeId } =
    filterData;
  const [term, setTerm] = useState("");
  const [form, setForm] = useState("");
  const [Search, setSearch] = useState("");
  const [fileName, setFileName] = useState("");
  const [Grupos, setGrupos] = useState(true);

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
    dispatch(getIndexAllCabinetPreview(id));
    dispatch(setFolderChildCore());
  };

  const BusquedaGlobal = (name) => {
    setSearch(name);
  };

  const Submit = (e) => {
    e.preventDefault();
    dispatch(setFilterFileByName(Search));
    dispatch(setFilterCabinetsByName(Search));
    dispatch(setFilterFoldersByName(Search));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }

  function searchingForm(form) {
    return function (x) {
      return x.name.toLowerCase().includes(form.toLowerCase()) || !form;
    };
  }

  function searchingFile(fileName) {
    return function (x) {
      return x.name.toLowerCase().includes(fileName.toLowerCase()) || !fileName;
    };
  }

  const handlerDiets = () => {
    const checkboxes = document.querySelectorAll(
      'input[name="fileSelected"]:checked'
    );
    const SelectedTypes = [];
    checkboxes.forEach((checkbox) => {
      SelectedTypes.push(checkbox.value);
    });
    dispatch(getFileTypeSelectionData(SelectedTypes));
  };

  const SelectionName = () => {
    dispatch(getStateNameFile());
  };

  const SelectionDescription = () => {
    dispatch(getStateDescriptionFile());
  };

  const SelectionFile = (checked) => {
    dispatch(getFileTypeFile(checked));
  };

  const SearchFile = (e) => {
    e.preventDefault();
    const filterData = {
      nameFile: nameFile,
      descriptionFile: descriptionFile,
      text: text,
      fileTypeId: fileTypeId,
    };
    dispatch(setFilterFileConfiguration(filterData));
  };

  return (
    <SearchContainer>
      {isFilterFileType ? (
        <ul>
          <Form onSubmit={SearchFile}>
            <SearchInput
              placeholder="Buscar"
              onChange={(e) => BusquedaGlobal(e.target.value)}
            />
            <IconSearch element="close" x={20} y={20} />
          </Form>
          <br />
          <List>
            <Titulo>Configuracion Archivos</Titulo>
            <ContainerType>
              <div>
                <input
                  name="nameFile"
                  type="checkbox"
                  checked={nameFile}
                  onChange={() => SelectionName()}
                />
                <span>Nombre</span>
              </div>
              <div>
                <input
                  name="description"
                  type="checkbox"
                  checked={descriptionFile}
                  onChange={() => SelectionDescription()}
                />
                <span>Descripcion</span>
              </div>
              <div>
                <input
                  name="fileType"
                  type="checkbox"
                  onChange={(e) => SelectionFile(e.target.checked)}
                />
                <span>Tipo De Archivo</span>
              </div>
            </ContainerType>

            <br />
            {fileTypeFile ? (
              <ContainerFiles>
                <SearchInput
                  placeholder="Buscar"
                  onChange={(e) => setFileName(e.target.value)}
                />
                <FilesContent>
                  <ContainerType>
                    {TypeFile ? (
                      TypeFile.filter(searchingFile(fileName)).map(
                        (file, i) => (
                          <div>
                            <input
                              className="Check"
                              type="checkbox"
                              value={file.id}
                              name="fileSelected"
                              onChange={handlerDiets}
                            />
                            <span className="Name">{file.name}</span>
                          </div>
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </ContainerType>
                </FilesContent>
              </ContainerFiles>
            ) : (
              <></>
            )}
          </List>
        </ul>
      ) : (
        <ul>
          <Form onSubmit={Submit}>
            <SearchInput
              placeholder="Buscar"
              onChange={(e) => BusquedaGlobal(e.target.value)}
            />
            <IconSearch element="open" x={25} y={25} />
          </Form>
          <br />
          {isLoadingGroup ? (
            <LoadingSpinner />
          ) : (
            <List>
              <Titulo onClick={(e) => setGrupos(!Grupos)}>Grupos</Titulo>
              {groups ? (
                groups.map(({ id, name }) => (
                  <>
                    {Grupos ? (
                      <div key={id} onClick={() => setOptionsGroup(id, name)}>
                        <ItemCelda
                          index={id}
                          id={id}
                          name={name}
                          element="group"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
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
              <SearchUser
                placeholder=" Buscar Gabinete"
                onChange={(e) => setTerm(e.target.value)}
              />
              {cabinets ? (
                cabinets.filter(searchingTerm(term)).map(({ id, name }) => (
                  <div key={id} onClick={() => setOptionsCabinet(id, name)}>
                    <ItemCelda
                      index={id}
                      id={id}
                      name={name}
                      element="cabinet"
                    />
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
            <SearchUser
              placeholder=" Buscar Carpeta"
              onChange={(e) => setForm(e.target.value)}
            />
            {folderCabinet ? (
              folderCabinet
                .filter(searchingForm(form))
                .map(({ id, name, cabinetId }) => (
                  <div key={id}>
                    <ItemFolder
                      index={id}
                      id={id}
                      name={name}
                      cabinetId={cabinetId}
                      element="folder"
                    />
                  </div>
                ))
            ) : (
              <></>
            )}
          </List>
        </ul>
      )}
    </SearchContainer>
  );
};

export default Search;

const SearchUser = styled.input`
  width: 100%;
  height: 1.8rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
`;

const Form = styled.form`
  padding: 2rem 0 0 0;
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 0 0 0.5rem;
`;

const ContainerType = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    width: 90%;
  }

  div > span {
    margin: 0.3rem 0 0.8rem 1rem;
  }

  div > input {
    margin: 0.3rem 0 0.8rem 1rem;
  }
`;

const ContainerFiles = styled.div`
  width: 90%;
  margin: 0 0 0 1rem;
`;

const FilesContent = styled.div`
  width: 100%;
  margin: 1rem 0 0 0;
  height: 260px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  .Name {
    font-size: 12px;
  }
`;
