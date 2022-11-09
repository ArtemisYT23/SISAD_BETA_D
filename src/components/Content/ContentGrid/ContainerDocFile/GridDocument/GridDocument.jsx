import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getFileAllDocument } from "../../../../../redux/states/Files";
import { setSelectedDocumentDocu } from "../../../../../redux/states/Document";
import { setSelectedSearchMetadataCore } from "../../../../../redux/states/View";
import { setOpenDetalleModal } from "../../../../../redux/states/ActionDocumentary";

const GridDocument = ({id, folderId, cabinetId, sequentialId }) => {
    const dispatch = useDispatch();

  const DocumentEnter = (id, folderId) => {
    dispatch(getFileAllDocument(id));
    dispatch(setSelectedDocumentDocu(id));
    dispatch(setSelectedSearchMetadataCore());
    dispatch(setOpenDetalleModal(false));
  };

  const SelectedFolder = (id, cabinetId) => {
  };

  const selectedDocument = (index) => {
    const collection = document.getElementsByClassName("CeldaDocument");
    for (let i = 0; i < collection.length; i++){
        collection[i].style.backgroundColor = "#fff";
        collection[i].style.color = "#c4c4c4";
        if ( id === index) {
            document.getElementById(index).style.backgroundColor = "#F68A20";
            document.getElementById(index).style.color = "#e9e6e6";
        }
    }
  }

  return (
    <ContainerCeldaRegister id={id} className="CeldaDocument" onClick={() => {DocumentEnter(id, folderId), SelectedFolder(folderId, cabinetId), selectedDocument(id)}}>
      <span>registro {sequentialId}</span>
    </ContainerCeldaRegister>

  );
}

export default GridDocument;

const ContainerCeldaRegister = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: .5rem;
    border: 1px solid #F68A20;
    color: #F68A20;
    font-size: .9rem;
    font-weight: bold;
`;