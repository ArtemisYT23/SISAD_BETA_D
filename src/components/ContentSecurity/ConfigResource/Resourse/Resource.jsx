import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  setOpenModalCreatedResource,
  setOpenModalUpdateResource,
  setOpenModalDeleteResource,
  setOpenModalUpdateResourceFolder,
} from "../../../../redux/states/ActionSecurity";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import HeaderSecurity from "../../HeaderSecurity/HeaderSecurity";
import { setSelectedUserCore } from "../../../../redux/states/UserCore";
import { DeleteElement, EditElement, SearchFilter } from "./icons";
import ResourceCreated from "../ModalesResourse/ResourceCreated";
import ResourceUpdatePermision from "../ModalesResourse/ResourceUpdate";
import ResourceFolderUpdate from "../ModalesResourse/ResourceFolderUpdate";
import ResourceDeleteCore from "../ModalesResourse/ResourceDelete";
import { Tooltip } from "@material-ui/core";

const Resource = () => {
  const dispatch = useDispatch();
  const { userCore, resourceCore } = useSelector((store) => store);
  const { ResourcePermision, isLoadingResource } = resourceCore;
  const { UserList } = userCore;
  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);

  const OpenModalCreatedResource = () => {
    dispatch(setOpenModalCreatedResource(true));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.name.includes(term) || !term;
    };
  }

  useEffect(() => {
    // console.log(ResourcePermision);
    const User = [];
    UserList?.forEach((index, i) => {
      ResourcePermision?.forEach((resour, i) => {
        if (index.id == resour.userId) {
          const filterUser = {
            id: index.id,
            name: index.userName,
          };

          User.push(filterUser);
        }
      });
    });
    // console.log(User);
    let hash = {};
    const array = User.filter((o) =>
      hash[o.id] ? false : (hash[o.id] = true)
    );
    setData(array);
  }, [ResourcePermision]);

  const Title = "Gestion de Recursos";
  const SubTitle = "Listado del Recursos del sistema y asignaciones";

  const OpenModalUpdateCabinet = (index) => {
    dispatch(setOpenModalUpdateResource(true));
  };

  const OpenModalUpdateFolder = (index) => {
    dispatch(setOpenModalUpdateResourceFolder(true));
  };

  const OpenModalDeleteResource = (index) => {
    dispatch(setOpenModalDeleteResource(true));
  };

  return (
    <SecurityPanelResource>
      <HeaderSecurity Title={Title} SubTitle={SubTitle} />
      <br />
      <HeadersContainer>
        <ContainerButton>
          <Tooltip title="Nuevo">
            <NewIndex onClick={(e) => OpenModalCreatedResource()}>
              Agregar
            </NewIndex>
          </Tooltip>
          <SearchUser
            placeholder=" Buscar Usuario"
            onChange={(e) => setTerm(e.target.value)}
          />
          <ButtonSearch>
            <SearchFilter x={22} y={22} />
          </ButtonSearch>
        </ContainerButton>
        <ContainerSearch />
      </HeadersContainer>
      <br />

      {isLoadingResource ? (
        <LoadingSpinner />
      ) : (
        <TableContainer>
          <TableRaid>
            <table>
              <tr>
                <THN>N</THN>
                <TH>USUARIO</TH>
                <TH>EDITAR GABINETES</TH>
                <TH>EDITAR CARPETAS</TH>
                <THD>ELIMINAR</THD>
              </tr>

              {data ? (
                data?.filter(searchingTerm(term)).map((index, i) => (
                  <tr key={i}>
                    <TD1>{i + 1}</TD1>
                    <TD1>{index.name}</TD1>
                    <TD1>
                      <ContentOptions>
                        <Tooltip title="Editar">
                          <ContainerEdit>
                            <ButtonOptions
                              onClick={() => {
                                OpenModalUpdateCabinet(index.id),
                                  dispatch(setSelectedUserCore(index.id));
                              }}
                            >
                              <EditElement x={30} y={30} />
                            </ButtonOptions>
                          </ContainerEdit>
                        </Tooltip>
                      </ContentOptions>
                    </TD1>
                    <TD1>
                      <ContentOptions>
                        <Tooltip title="Editar">
                          <ContainerEdit>
                            <ButtonOptions
                              onClick={() => {
                                OpenModalUpdateFolder(index.id),
                                  dispatch(setSelectedUserCore(index.id));
                              }}
                            >
                              <EditElement x={30} y={30} />
                            </ButtonOptions>
                          </ContainerEdit>
                        </Tooltip>
                      </ContentOptions>
                    </TD1>
                    <TD1>
                      <ContentOptions>
                        <Tooltip title="Eliminar">
                          <ContainerDelete
                            onClick={() => {
                              OpenModalDeleteResource(index.id),
                                dispatch(setSelectedUserCore(index.id));
                            }}
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

      <ResourceCreated />
      <ResourceUpdatePermision />
      <ResourceFolderUpdate />
      <ResourceDeleteCore />

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
    </SecurityPanelResource>
  );
};

export default Resource;

const SecurityPanelResource = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

const SearchUser = styled.input`
  width: 45%;
  height: 2rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
  @media (max-width: 767px) {
   width: 70%;
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

const ContainerSearch = styled.div`
  width: 50%;
  display: flex;
  @media (max-width: 767px) {
   display: none;
  }
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

const THD = styled.th`
  width: 8rem;
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
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ContainerDelete = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonOptions = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
