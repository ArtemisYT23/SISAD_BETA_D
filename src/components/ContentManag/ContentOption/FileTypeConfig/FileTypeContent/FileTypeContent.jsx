import { useState } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { SearchFilter, EditElement, DeleteElement } from "./icons";
import {
  setOpenModalTypeFileCreated,
  setOpenModalTypeFileUpdate,
  setOpenModalTypeFileDelete
} from "../../../../../redux/states/ActionConfig";
import { setSelectedTypeFileConfig } from "../../../../../redux/states/FileType";
import FileTypeCreated from "../ModalesFileType/FileTypeCreated";
import FileTypeUpdate from "../ModalesFileType/FileTypeUpdate";
import FileTypeDelete from "../ModalesFileType/FileTypeDelete";
import LoadingSpinner from "../../../../../utilities/LoadingSpinner";

const FileTypeContent = () => {
  const dispatch = useDispatch();
  const { typeFileCore } = useSelector((store) => store);
  const { isLoadingTypeFile, TypeFile } = typeFileCore;
  const [term, setTerm] = useState("");

  const OpenModalFileTypeCreatedConfig = () => {
    dispatch(setOpenModalTypeFileCreated(true));
  };

  const OpenModalUpdateFileType = (id) => {
    dispatch(setSelectedTypeFileConfig(id));
    dispatch(setOpenModalTypeFileUpdate(true));
  };

  const OpenModalDeleteFileType = (id) => {
    dispatch(setSelectedTypeFileConfig(id));
    dispatch(setOpenModalTypeFileDelete(true));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.name.toLowerCase().includes(term) || !term;
    };
  }

  return (
    <ContainerIndex>
      <HeadersContainer>
        <ContainerButton>
          <NewIndex onClick={(e) => OpenModalFileTypeCreatedConfig()}>
            Nuevo
          </NewIndex>
          <SearchUser
            placeholder=" Buscar Tipo de Archivo"
            onChange={(e) => setTerm(e.target.value)}
          />
          <ButtonSearch>
            <SearchFilter x={22} y={22} />
          </ButtonSearch>
        </ContainerButton>
        <ContainerSelect />
      </HeadersContainer>
      <br />

      {isLoadingTypeFile ? (
        <LoadingSpinner />
      ) : (
        <TableContainer>
          <TableRaid>
            <Table>
              <tr>
                <THN>N</THN>
                <TH>Nombre</TH>
                <TH>Descripcion</TH>
                <TH>Por Defecto</TH>
                <TH>Editar / Eliminar</TH>
              </tr>

              {TypeFile ? (
                TypeFile.filter(searchingTerm(term)).map((file, i) => (
                  <tr key={i}>
                    <TD1>{i + 1}</TD1>
                    <TD1>{file.name}</TD1>
                    <TD1>{file.description}</TD1>
                    <TD1>
                      <input type="checkbox" checked={file.isDefault} />
                    </TD1>
                    <TD1>
                      <ContentOptions>
                        <ContainerEdit>
                          <ButtonOptions
                            onClick={() => OpenModalUpdateFileType(file.id)}
                          >
                            <EditElement x={30} y={30} />
                          </ButtonOptions>
                        </ContainerEdit>

                        <ContainerDelete
                          onClick={() => OpenModalDeleteFileType(file.id)}
                        >
                          <ButtonOptions>
                            <DeleteElement x={30} y={30} />
                          </ButtonOptions>
                        </ContainerDelete>
                      </ContentOptions>
                    </TD1>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </Table>
          </TableRaid>
        </TableContainer>
      )}

      <FileTypeCreated />
      <FileTypeUpdate/>
      <FileTypeDelete />

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />
    </ContainerIndex>
  );
};

export default FileTypeContent;

const ContainerIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 1rem 0 0 0;
  @media (max-width: 767px) {
    height: 100%;
  }
`;

const HeadersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ContainerButton = styled.div`
  width: 65%;
  display: flex;
  justify-content: flex-start;
  @media (max-width: 767px) {
   width: 96%;
  }
`;

const SearchUser = styled.input`
  width: 45%;
  height: 2rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
  @media (max-width: 767px) {
   width: 60%;
  }
`;

const ButtonSearch = styled.button`
  padding: 0.5rem;
  width: 2.2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f68a20;
  background: none;
`;

const NewIndex = styled.button`
  border: none;
  padding: 0.5rem;
  margin: 0 0.5rem 0 0;
  width: 20%;
  color: var(--white);
  background-color: var(--primaryColor);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 0.5rem 0.5rem;
  cursor: pointer;
`;

const ContainerSelect = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-end;
   @media (max-width: 767px) {
   display: none;
  }
`;

const TableContainer = styled.div`
  width: 95%;
  display: flex;
  overflow: hidden;
`;

const TableRaid = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
`;

const Table = styled.table`

`;

const THN = styled.th`
  width: 4rem;
  height: 2rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const TH = styled.th`
  width: 12rem;
  height: 2.1rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const TD1 = styled.td`
  font-size: 0.9rem;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #5f5f5f;
  height: 2.4rem;
  border: 1px solid #c4c4c4;
`;

const ContentOptions = styled.div`
  display: flex;
   width: 100px;
`;

const ContainerEdit = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const ContainerDelete = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonOptions = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
