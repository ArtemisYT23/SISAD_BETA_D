import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { EditElement, DeleteElement } from "./icons";
import {
  setOpenModalConfigCreated,
  setOpenModalConfigUpdate,
  setOpenModalConfigDelete,
} from "../../../../../redux/states/ActionConfig";
import { setSelectedIndexes } from "../../../../../redux/states/Indexes";
import IndexCreated from "../ModalesIndex/IndexCreated";
import IndexUpdate from "../ModalesIndex/IndexUpdate";
import IndexDelete from "../ModalesIndex/IndexDelete";
import LoadingSpinner from "../../../../../utilities/LoadingSpinner";

const IndexContainer = () => {
  const dispatch = useDispatch();
  const { cabinetCore, indexCore } = useSelector((store) => store);
  const { UpdateSelectedCabinet } = cabinetCore;
  const { IndexConfig, isLoadingIndex } = indexCore;

  const OpenModalIndexCreatedConfig = () => {
    dispatch(setOpenModalConfigCreated(true));
  };

  const OpenModalUpdateIndex = (id) => {
    dispatch(setSelectedIndexes(id));
    dispatch(setOpenModalConfigUpdate(true));
  };

  const OpenModalDeleteIndex = () => {
    dispatch(setOpenModalConfigDelete(true));
  };

  return (
    <ContainerIndex>
      <HeadersContainer>
        <ContainerButton>
          <NewIndex onClick={(e) => OpenModalIndexCreatedConfig()}>
            Nuevo
          </NewIndex>
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
                IndexConfig.map((index, i) => (
                  <tr key={i}>
                    <TD1>{i + 1}</TD1>
                    <TD1>{index.name}</TD1>
                    <TD1>{index.description}</TD1>
                    <TD1>{index.dataTypeName}</TD1>
                    <TD1>{index.listName}</TD1>
                    <TD1>
                      <ContentOptions>
                        <ContainerEdit>
                          <ButtonOptions
                            onClick={() => OpenModalUpdateIndex(index.id)}
                          >
                            <EditElement x={30} y={30} />
                          </ButtonOptions>
                        </ContainerEdit>

                        <ContainerDelete
                          onClick={() => OpenModalDeleteIndex(index.id)}
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
  width: 100%;
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
