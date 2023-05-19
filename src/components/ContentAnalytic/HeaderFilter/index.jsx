import styled from "styled-components";
import { useState, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserFilter } from "../../../redux/states/AnalitycInfo";

export const HeaderFilter = () => {
  const dispatch = useDispatch();
  const { analitycData, typeFileCore } = useSelector((store) => store);
  const { folderId, ColaboratorDefault } = analitycData;
  const { TypeFile } = typeFileCore;

  const [selectedFileType, setSelectedFileType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeButton, setActiveButton] = useState(true);
  const [buttonSearch, setButtonSearch] = useState(true);
  const [filterColaborator, setFilterColaborator] = useState([]);

  useEffect(() => {
    const newColaboratorList = [];
    ColaboratorDefault.map((col) => {
      const newColaborator = {
        id: col.docMetadataCountFiles.Id,
        name: col.docMetadataCountFiles.NOMBRE,
      };
      newColaboratorList.push(newColaborator);
    });
    setFilterColaborator(newColaboratorList);
  }, [ColaboratorDefault]);

  const handleChangeUser = (value) => {
    setSelectedUser(value);
    setActiveButton(false);
  };

  const handleChange = (value) => {
    setSelectedFileType(value);
    if (value != "") {
      setButtonSearch(false);
    }
  };

  const handleSubmit = () => {
    const fileTypes = [];
    selectedFileType.map((file) => {
      fileTypes.push(file.id);
    });

    const obj = {
      cabinetId: null,
      folderId: folderId,
      fileTypeId: fileTypes,
    };
    dispatch(setSelectedUserFilter(selectedUser, obj));
  };


  return (
    <HeaderContainer>
      <ContainerSelection>
        <SpaceLine />
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedUser}
            onChange={(e) => handleChangeUser(e.value)}
            options={filterColaborator}
            filter={true}
            optionLabel="name"
            placeholder="Seleccione Colaboradores"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
        <SpaceLine />

        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFileType}
            onChange={(e) => handleChange(e.value)}
            options={TypeFile}
            filter={true}
            optionLabel="name"
            placeholder="Seleccione Tipos de Archivos"
            maxSelectedLabels={3}
            disabled={activeButton}
            className="w-full md:w-20rem"
          />
        </div>
        <SpaceLine />

        <ButtonSubmit onClick={handleSubmit}>Buscar</ButtonSubmit>
      </ContainerSelection>
    </HeaderContainer>
  );
};


const HeaderContainer = styled.div`
  height: 4.5rem;
  border-bottom: 1px solid var(--lineColor);
`;

const ContainerSelection = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const SpaceLine = styled.div`
  margin: 0 1rem 0 0;
`;

const ButtonSubmit = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 13px;
  border: none;
  background-color: #630e8a;
  color: #fff;
  cursor: pointer;

  :disabled {
    background-color: #783d94;
  }
`;