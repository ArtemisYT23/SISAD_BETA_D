import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElementIcon from "./Icons";
import { Options } from "./Options";
import {
  setOpenModalDeleteFile,
  setOpenDetalleModal,
} from "../../../../../../redux/states/ActionDocumentary";
import {
  setSelectedUrlFileCore,
  setSelectedFileDocumentary,
} from "../../../../../../redux/states/Files";
import { getAllHistoryElementDocu } from "../../../../../../redux/states/History";
import { setSelectedMetadataDocument } from "../../../../../../redux/states/Metadata";
import FilesDelete from "../ModalesFile/FilesDelete";
import { Tooltip } from "@material-ui/core";

const GridFiles = ({
  element,
  id,
  extension,
  name,
  documentId,
  file,
  fileTypeName,
  description,
}) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { userSesion } = useSelector((store) => store);
  const { RolSesion } = userSesion;

  const EntrarDetalle = (id, documentId, file, userId) => {
    dispatch(setOpenDetalleModal(true));
    dispatch(getAllHistoryElementDocu(id, userId));
    dispatch(setSelectedUrlFileCore(file));
    dispatch(setSelectedFileDocumentary(id));
    dispatch(setSelectedMetadataDocument(documentId));
  };

  const dropdownCabinet = (index) => {
    dispatch(setSelectedFileDocumentary(id));
    setShowMenu(!showMenu);
    const collection = document.getElementsByClassName("dropdown");
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.display = "none";
      if (id === index) {
        setShowMenu(!showMenu);
        document.getElementById(index).style.display = "flex";
      }
    }
  };

  const DeleteFile = () => {
    dispatch(setOpenModalDeleteFile(true));
  };

  return (
    <>
      <GridDocContainer
        onDoubleClick={() => EntrarDetalle(id, documentId, file, RolSesion[0])}
      >
        {showMenu && (
          <Dropdown className="dropdown">
            <DropdownContent>
              <DropdownItem onClick={() => DeleteFile()}>Eliminar</DropdownItem>
            </DropdownContent>
            <FilesDelete />
          </Dropdown>
        )}

        {RolSesion[2] == "Administrator" && (
          <ContainerIcon onClick={() => dropdownCabinet(id)}>
            <Options x={20} y={20} fill={"#F68A20"} />
          </ContainerIcon>
        )}

        {RolSesion[2] != "Administrator" && (
          <ContainerIcon onClick={() => dropdownCabinet(id)}>
            <Options x={20} y={20} fill={"#F68A20"} />
          </ContainerIcon>
        )}

        <ElementIcon element={element} />

        <ContainerDistint>
          {(() => {
            switch (extension) {
              case ".docx":
                return (
                  <DistintivoPDF color="#356be0">
                    <TypeFile>{extension}</TypeFile>
                  </DistintivoPDF>
                );
              case ".xlsx":
                return (
                  <DistintivoPDF color="green">
                    <TypeFile>{extension}</TypeFile>
                  </DistintivoPDF>
                );
              default:
                return (
                  <DistintivoPDF color="red">
                    <TypeFile>{extension}</TypeFile>
                  </DistintivoPDF>
                );
            }
          })()}
        </ContainerDistint>

        <NumberOfElementChild>
          <div>
            <strong>
              <Tooltip title={name}>
                <span>{name}</span>
              </Tooltip>
            </strong>
          </div>
        </NumberOfElementChild>

        <ElementNameDoc>
          <div>
            <strong>
              <Tooltip title={description}>
                <span>{description}</span>
              </Tooltip>
            </strong>
          </div>
        </ElementNameDoc>
        <NumberOfElementChild>
        <div>
            <strong>
              <Tooltip title={fileTypeName}>
                <span> {fileTypeName}</span>
              </Tooltip>
            </strong>
          </div>
        </NumberOfElementChild>
      </GridDocContainer>
    </>
  );
};

export default GridFiles;

const GridDocContainer = styled.div`
  display: inline-flex;
  width: 10rem;
  height: 11rem;
  border-radius: 2rem;
  background-color: none;
  margin: 2rem 0 0 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const ContainerIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  cursor: pointer;
`;

const ContainerDistint = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DistintivoPDF = styled.div`
  background: ${(props) => props.color};
  width: 2.8rem;
  height: 1.5rem;
  border-radius: 0.5rem 0 0.5rem 0;
  display: flex;
  justify-content: center;
`;

const TypeFile = styled.span`
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
`;

const NumberOfElementChild = styled.div`
  div {
    width: 150px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    align-items: center;
    color: var(--lineColor);
  }

  span {
    text-transform: uppercase;
    font-size: 14px;
  }
  strong {
    float: center;
  }
`;

const ElementNameDoc = styled.h4`
  div {
    width: 150px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    align-items: center;
    color: var(--primaryColor);
  }

  span {
    text-transform: uppercase;
    font-size: 14px;
  }
  strong {
    float: center;
  }
`;

const Dropdown = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
`;

const DropdownContent = styled.div`
  position: absolute;
  border-radius: 10%;
  width: 120px;
  top: 1rem;
  left: 7rem;
  color: #f68a20;
  border: 1px solid #f68a20;
  background: white;
`;

const DropdownItem = styled.div`
  padding: 0.3rem;
  margin: 0.3rem;
  text-align: center;
  cursor: pointer;
  line-height: 1.2;
  padding-top: 0.5rem;
  color: #faac1c;
  font-weight: 600;
`;

const LineItem = styled.hr`
  width: 100%;
  background: #f68a20;
`;
