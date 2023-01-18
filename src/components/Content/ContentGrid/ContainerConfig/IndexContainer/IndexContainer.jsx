import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { SearchFilter, EditElement, DeleteElement } from "./icons";
import { setOpenModalConfigCreated } from "../../../../../redux/states/ActionConfig";
import {
  setSelectedIndexes,
  setSelectedIndexesUpdate,
} from "../../../../../redux/states/Indexes";
import IndexCreated from "../ModalesIndex/IndexCreated";
import IndexUpdate from "../ModalesIndex/IndexUpdate";
import IndexDelete from "../ModalesIndex/IndexDelete";
import LoadingSpinner from "../../../../../utilities/LoadingSpinner";
import { Tooltip } from "@material-ui/core";

const IndexContainer = () => {
  const dispatch = useDispatch();
  const { cabinetCore, indexCore, userSesion } = useSelector((store) => store);
  const { OptionsTocken } = userSesion;
  const { UpdateSelectedCabinet } = cabinetCore;
  const { IndexConfig, isLoadingIndex } = indexCore;
  const [term, setTerm] = useState("");
  const [update, setUpdate] = useState(false);
  const [delet, setDelet] = useState(false);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    OptionsTocken.map((n, i) => {
      //crear indice
      if (n.id == "7a102ffd-6911-4133-85a0-d5640c339780") {
        setCreated(true);
      }
      //actualizar indice
      if (n.id == "ec5c1dc3-a1c5-472b-ab63-80ed44e29eb0") {
        setUpdate(true);
      }
      //eliminar indice
      if (n.id == "65775d93-2a29-4a69-93e7-777690499564") {
        setDelet(true);
      }
    });
  }, []);

  const OpenModalIndexCreatedConfig = () => {
    dispatch(setOpenModalConfigCreated(true));
  };

  const OpenModalUpdateIndex = (id) => {
    update ? dispatch(setSelectedIndexesUpdate(id)) : <></>;
  };

  const OpenModalDeleteIndex = (id) => {
    delet ? dispatch(setSelectedIndexes(id)) : <></>;
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
          {created && (
            <NewIndex onClick={(e) => OpenModalIndexCreatedConfig()}>
              Nuevo
            </NewIndex>
          )}

          {IndexConfig != "" && (
            <>
              <SearchUser
                placeholder=" Buscar Usuario"
                onChange={(e) => setTerm(e.target.value)}
              />
              <ButtonSearch>
                <SearchFilter x={22} y={22} />
              </ButtonSearch>
            </>
          )}
        </ContainerButton>

        <ContainerSelect>
          <TituloSelect>
            <OptionsSelect>{UpdateSelectedCabinet?.name}</OptionsSelect>
          </TituloSelect>
        </ContainerSelect>
      </HeadersContainer>
      <br />

      {isLoadingIndex ? (
        <LoadingSpinner />
      ) : (
        <TableContainer>
          <TableRaid>
            <table>
              <tr>
                <THN>N</THN>
                <TH>Nombre</TH>
                <TH>Descripcion</TH>
                <TH>Tipo de Dato</TH>
                <TH>Lista de Dato</TH>
                <TH>Editar / Eliminar</TH>
              </tr>

              {IndexConfig ? (
                IndexConfig.filter(searchingTerm(term)).map((index, i) => (
                  <tr key={i}>
                    <TD1>{i + 1}</TD1>
                    <TD1>{index.name}</TD1>
                    <TD1>{index.description}</TD1>
                    <TD1>{index.dataTypeName}</TD1>
                    <TD1>{index.listName}</TD1>
                    <TD1>
                      <ContentOptions>
                        <Tooltip title="Editar">
                          <ContainerEdit
                            onClick={() => OpenModalUpdateIndex(index.id)}
                          >
                            <ButtonOptions>
                              <EditElement x={30} y={30} />
                            </ButtonOptions>
                          </ContainerEdit>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                          <ContainerDelete
                            onClick={() => OpenModalDeleteIndex(index.id)}
                          >
                            <ButtonOptions>
                              <DeleteElement x={30} y={30} />
                            </ButtonOptions>
                          </ContainerDelete>
                        </Tooltip>
                      </ContentOptions>
                    </TD1>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </table>
          </TableRaid>
        </TableContainer>
      )}

      <IndexCreated />
      <IndexUpdate />
      <IndexDelete />

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

export default IndexContainer;

const ContainerIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 1rem 0 0 0;
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
`;

const SearchUser = styled.input`
  width: 45%;
  height: 2rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
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
  &:disabled {
    background-color: #c29a44;
  }
`;

const ContainerSelect = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-end;
  border: 1px solid var(--lineColor);
`;

const TituloSelect = styled.select`
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--primaryColor);
  text-decoration: none;
  text-align: center;
  border: 1px solid var(--primaryColor);
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const OptionsSelect = styled.option`
  font-weight: bold;
  color: var(--primaryColor);
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
  justify-content: center;
  align-items: center;
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
