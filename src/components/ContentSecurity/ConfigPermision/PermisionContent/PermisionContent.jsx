import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "@material-ui/core";
import HeaderSecurity from "../../HeaderSecurity/HeaderSecurity";
import { DeleteElement, EditElement, SearchFilter } from "./icons";
import {
  openModalProfileCreated,
  setOpenModalProfileUpdate,
} from "../../../../redux/states/ActionSecurity";
import {
  getProfilePermisionCore,
  getProfilePermisionCoreDelete,
} from "../../../../redux/states/Permision";
import ProfileCreated from "../ModalesProfile/ProfileCreated";
import ProfileUpdate from "../ModalesProfile/ProfileUpdate";
import ProfileDelete from "../ModalesProfile/ProfileDelete";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";

const PermisionContent = () => {
  const dispatch = useDispatch();
  const { profileCore } = useSelector((store) => store);
  const { profile, isLoadingProfile } = profileCore;
  const [term, setTerm] = useState("");

  const OpenModalPermisionCreatedConfig = () => {
    dispatch(openModalProfileCreated(true));
  };

  const UpdateUserRow = (id) => {
    dispatch(getProfilePermisionCore(id));
  };

  const DeleteUserRow = (id) => {
    dispatch(getProfilePermisionCoreDelete(id));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.name.toLowerCase().includes(term) || !term;
    };
  }

  const Title = "Gestion de Perfil";
  const SubTitle =
    "Listado de Perfiles existentes y preferencias de perfiles sisad cloud";

  return (
    <PanelPermision>
      <HeaderSecurity Title={Title} SubTitle={SubTitle} />
      <br />
      <HeadersContainer>
        <ContainerButton>
          <Tooltip title="Nuevo">
            <NewIndex onClick={(e) => OpenModalPermisionCreatedConfig()}>
              Nuevo
            </NewIndex>
          </Tooltip>

          <SearchUser
            placeholder=" Buscar Perfil"
            onChange={(e) => setTerm(e.target.value)}
          />

          <ButtonSearch>
            <SearchFilter x={22} y={22} />
          </ButtonSearch>
        </ContainerButton>
        <ContainerSearch />
      </HeadersContainer>
      <br />

      {isLoadingProfile ? (
        <LoadingSpinner />
      ) : (
        <TableContainer>
          <TableRaid>
            <table>
              <tr>
                <THN>Id</THN>
                <TH>Nombre</TH>
                <TH>Acciones</TH>
              </tr>

              {profile ? (
                profile.filter(searchingTerm(term)).map((profile, i) => (
                  <tr key={i}>
                    <TD1>{i + 1}</TD1>
                    <TD1>{profile.name}</TD1>
                    <TD1>
                      <ContentOptions>
                        <Tooltip title="Editar">
                          <ContainerEdit>
                            <ButtonOptions
                              onClick={() => UpdateUserRow(profile.id)}
                            >
                              <EditElement />
                            </ButtonOptions>
                          </ContainerEdit>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <ContainerDelete
                            onClick={() => DeleteUserRow(profile.id)}
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

      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />

      <ProfileCreated />
      <ProfileUpdate />
      <ProfileDelete />
    </PanelPermision>
  );
};

export default PermisionContent;

const PanelPermision = styled.div`
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
