import styled from "styled-components";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setFolderIdSave,
  getAllColaboratorDefaultFilter,
} from "../../../redux/states/AnalitycInfo";
import { getMetadataByCabinet } from "../../../redux/states/AnalitycData";

export const HeaderPrimary = () => {
  const dispatch = useDispatch();
  const { cabinetCore, folderCore } = useSelector((store) => store);
  const { cabinets } = cabinetCore;
  const { folders } = folderCore;
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const SectionBusiness = [
    {
      name: "Toyota",
    },
  ];

  const handleBusinessSelection = (value) => {
    setSelectedBusiness(value);
    setSelectedCabinet(null);
  };

  const handleSelectedCabinet = (value) => {
    setSelectedCabinet(value);
  };

  const handleSelectedFolder = (value) => {
    setSelectedFolder(value);
    dispatch(getMetadataByCabinet(value.id));
    dispatch(setFolderIdSave(value.id));

    const obj = {
      cabinetId: null,
      folderId: value.id,
      fileTypeId: ["37dbbffa-074f-41c2-86e2-5273794d7dd4"],
    };
    dispatch(getAllColaboratorDefaultFilter(obj));
  };

  return (
    <HeaderContainer>
      <ContainerSelection>
        <SpaceLine />
        <div className="card flex justify-content-center">
          <Dropdown
            value={selectedBusiness}
            onChange={(e) => handleBusinessSelection(e.value)}
            options={SectionBusiness}
            optionLabel="name"
            placeholder="Seleccione Empresa"
            className="w-full md:w-14rem"
          />
        </div>

        <SpaceLine />

        {cabinets && (
          <>
            <div className="card flex justify-content-center">
              <Dropdown
                value={selectedCabinet}
                onChange={(e) => handleSelectedCabinet(e.value)}
                options={cabinets}
                optionLabel="name"
                placeholder="Seleccione Gabinete"
                className="w-full md:w-14rem"
              />
            </div>

            <SpaceLine />
          </>
        )}

        {folders && (
          <>
            <div className="card flex justify-content-center">
              <Dropdown
                value={selectedFolder}
                onChange={(e) => handleSelectedFolder(e.value)}
                options={folders.filter((x) => x.folderId == null)}
                optionLabel="name"
                placeholder="Seleccione Carpeta"
                className="w-full md:w-14rem"
              />
            </div>

            <SpaceLine />
          </>
        )}
      </ContainerSelection>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 4rem;
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
