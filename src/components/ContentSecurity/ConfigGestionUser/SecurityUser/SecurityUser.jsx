import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setOpenModalCreatedUser,
  setOpenModalDeleteUser,
  setOpenModalUpdateUser,
} from "../../../../redux/states/ActionSecurity";
import { setSelectedUserCore } from "../../../../redux/states/UserCore";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import HeaderSecurity from "../../HeaderSecurity/HeaderSecurity";
import UserCreated from "../ModalesUser/UserCreated";
import UserDelete from "../ModalesUser/UserDelete";
import UserUpdate from "../ModalesUser/UserUpdate";
import { DeleteElement, EditElement, SearchFilter } from "./icons";
import { Tooltip } from "@material-ui/core";

const SecurityUser = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [term, setTerm] = useState("");
  const { userCore } = useSelector((store) => store);
  const { UserList, isLoadingUser } = userCore;

  useEffect(() => {
    setTableData(UserList);
  }, [UserList]);

  const OpenModalUserCreatedConfig = () => {
    dispatch(setOpenModalCreatedUser(true));
  };

  const UpdateUserRow = (id) => {
    dispatch(setSelectedUserCore(id));
    // dispatch(getUserDataSecurity(id));
    dispatch(setOpenModalUpdateUser(true));
  };

  const DeleteUserRow = (id) => {
    dispatch(setSelectedUserCore(id));
    // dispatch(getUserDataSecurity(id));
    dispatch(setOpenModalDeleteUser(true));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.userName.includes(term) || !term;
    };
  }

  const Title = "Gestion de Seguridad";
  const SubTitle =
    "Listado de Usuarios existentes y preferencias de perfiles sisad cloud";
  return (
    <SecurityPanelUser>
      <HeaderSecurity Title={Title} SubTitle={SubTitle} />
      <br />
      <HeadersContainer>
        <ContainerButton>
          <Tooltip title="Nuevo">
            <NewIndex onClick={(e) => OpenModalUserCreatedConfig()}>
              Nuevo
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

      {isLoadingUser ? (
        <LoadingSpinner />
      ) : (
        <TableContainer>
          <TableRaid>
            <table>
              <tr>
                <THN>Id</THN>
                <TH>Usuario</TH>
                <TH>Email</TH>
                <TH>Perfil</TH>
                <TH>Empresa</TH>
                <TH>Estado</TH>
                <TH>Acciones</TH>
              </tr>

              {UserList ? (
                UserList.filter(searchingTerm(term)).map((user, i) => (
                  <tr key={i}>
                    <TD1>{i + 1}</TD1>
                    <TD1>{user.userName}</TD1>
                    <TD1>{user.email}</TD1>
                    <TD1>{user.profileName}</TD1>
                    <TD1>{user.businessName}</TD1>
                    <TD1>
                      <input type="checkbox" checked={user.opeationalState} />
                    </TD1>
                    <TD1>
                      <ContentOptions>
                        <Tooltip title="Editar">
                          <ContainerEdit>
                            <ButtonOptions
                              onClick={() => UpdateUserRow(user.id)}
                            >
                              <EditElement />
                            </ButtonOptions>
                          </ContainerEdit>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                          <ContainerDelete
                            onClick={() => DeleteUserRow(user.id)}
                          >
                            <ButtonOptions>
                              <DeleteElement />
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

      <UserCreated />
      <UserUpdate />
      <UserDelete />

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
    </SecurityPanelUser>
  );
};

export default SecurityUser;

const SecurityPanelUser = styled.div`
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

const TableRaid = styled.div`
  width: 100%;
  height: 450px;
  overflow: scroll;
  margin: .5rem;
`;

const ContainerSearch = styled.div`
  width: 50%;
  display: flex;
  @media (max-width: 767px) {
   display: none;
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

const TableContainer = styled.div`
  width: 95%;
  display: flex;
  overflow: hidden;
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

const ButtonOptions = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const ContainerDelete = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
