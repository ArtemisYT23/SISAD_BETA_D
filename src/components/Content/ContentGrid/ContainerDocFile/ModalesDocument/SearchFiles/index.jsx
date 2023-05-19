import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalSearchFiles } from "../../../../../../redux/states/ActionDocumentary";
import { getFileByTextReferent } from "../../../../../../redux/states/Files";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";

const useStyless = makeStyles((theme) => ({
  modalSearchFiles: {
    position: "absolute",
    width: "420px",
    height: "450px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    overflowY: "scroll",
    borderRadius: "13px",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const SearchFiles = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const { modalDocumentary, typeFileCore, cabinetCore, folderCore } =
    useSelector((store) => store);
  const { modalFilesSearch } = modalDocumentary;
  const { TypeFile } = typeFileCore;
  const { SelectedCabinet } = cabinetCore;
  const { SelectedFolder } = folderCore;
  const [textFilter, setTextFilter] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [fileType, setFileTypeId] = useState([]);

  const selectionFileType = (e) => {
    const FileType = [];
    // console.log(e.value);
    setSelectedCity(e.value);

    if (e.value != undefined) {
      e.value.forEach((file, i) => {
        FileType.push(file.id);
      });
      setFileTypeId(FileType);
    }
  };

  const SearchFilesMetadata = (e) => {
    e.preventDefault();
    const SaveSearchFiles = {
      cabinetId: SelectedCabinet?.id,
      folderId: null,
      fileTypeId: fileType,
      textValue: textFilter,
    };
    console.log(SaveSearchFiles);
    dispatch(getFileByTextReferent(SaveSearchFiles))
    OpenModalSearchCreated()
  };

  const SearchContainer = (
    <div className={styless.modalSearchFiles}>
      <form onSubmit={SearchFilesMetadata}>
        <div align="center">
          <h2 className="titulo-modal"></h2>
        </div>
        <ContainerSearch>
          <InputSearch
            placeholder="Buscar"
            onChange={(e) => setTextFilter(e.target.value)}
          />

          <Button
            type="submit"
            icon="pi pi-search"
            className="p-button-rounded p-button-warning"
            title="BUSCAR"
            onClick={SearchFilesMetadata}
          />
        </ContainerSearch>
        <br />
        <ContainerFileType>
          <ListBox
            filter
            multiple
            value={selectedCity}
            options={TypeFile}
            onChange={(e) => selectionFileType(e)}
            optionLabel="name"
          />
        </ContainerFileType>
      </form>
    </div>
  );

  const OpenModalSearchCreated = () => {
    dispatch(setOpenModalSearchFiles(false));
    setSelectedCity(null);
  };

  return (
    <div className={styless.container}>
      <Modal open={modalFilesSearch} onClose={OpenModalSearchCreated}>
        {SearchContainer}
      </Modal>
    </div>
  );
};

export default SearchFiles;

const ContainerSearch = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const InputSearch = styled.input`
  width: 85%;
  height: 45px;
  outline: none;
`;

const ContainerFileType = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
