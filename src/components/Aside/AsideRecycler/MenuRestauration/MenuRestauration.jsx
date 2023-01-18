import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  GroupIcon,
  CabinetIcon,
  FolderIcon,
  IndexIcon,
  TypeDataIcon,
  TypeFileIcon,
} from "./icons";
import { PrivateRoutes } from "../../../../models/routes";
import { useNavigate } from "react-router-dom";
import { getNameGlobalChange } from "../../../../redux/states/Name";

const MenuRestauration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSesion } = useSelector((store) => store);
  const { RolSesion } = userSesion;

  const selectOptions = (Ruta, n) => {
    dispatch(getNameGlobalChange(n));
    navigate(`${Ruta}`);
  };

  return (
    <SearchContainer>
      <ul>
        <List>
          <Titulo>Restauracion</Titulo>
          {RolSesion[2] == "Administrator" && (
            <>
              <Items onClick={() => selectOptions(PrivateRoutes.DELETEGROUP, "Grupos")}>
                <Icons>
                  <GroupIcon />
                </Icons>
                <Name>Grupos</Name>
              </Items>
            </>
          )}
        </List>
        <br />
        <List>
          {RolSesion[2] == "Administrator" && (
            <>
              <Items onClick={() => selectOptions(PrivateRoutes.DELETECABINET, "Gabinetes")}>
                <Icons>
                  <CabinetIcon />
                </Icons>
                <Name>Gabinetes</Name>
              </Items>
            </>
          )}
        </List>
        <br />
        <List>
          {RolSesion[2] == "Administrator" && (
            <>
              <Items onClick={() => selectOptions(PrivateRoutes.DELETEFOLDER, "Carpetas")}>
                <Icons>
                  <FolderIcon />
                </Icons>
                <Name>Carpetas</Name>
              </Items>
            </>
          )}
        </List>
        <br />
        <List>
          {RolSesion[2] == "Administrator" && (
            <>
              <Items onClick={() => selectOptions(PrivateRoutes.DELETEINDEX, "Indices")}>
                <Icons>
                  <IndexIcon />
                </Icons>
                <Name>Indices</Name>
              </Items>
            </>
          )}
        </List>
        <br />
        <List>
          {RolSesion[2] == "Administrator" && (
            <>
              <Items
                onClick={() => selectOptions(PrivateRoutes.DELETETYPEDATA, "Tipo de Dato")}
              >
                <Icons>
                  <TypeDataIcon />
                </Icons>
                <Name>Tipo de Dato</Name>
              </Items>
            </>
          )}
        </List>
        <br />
        <List>
          {RolSesion[2] == "Administrator" && (
            <>
              <Items
                onClick={() => selectOptions(PrivateRoutes.DELETEFILETYPE, "Tipo De Archivo")}
              >
                <Icons>
                  <TypeFileIcon />
                </Icons>
                <Name>Tipo de Archivo</Name>
              </Items>
            </>
          )}
        </List>
      </ul>
    </SearchContainer>
  );
};

export default MenuRestauration;

const SearchContainer = styled.div`
  width: 12rem;
  height: 100vh;
  padding: 2rem 0 0 0;
  display: flex;
  overflow-y: scroll;
  justify-content: center;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.li`
  text-decoration: none;
  list-style: none;
`;

const Titulo = styled.span`
  color: var(--primaryColor);
  font-weight: 600;
  text-align: center left;
  text-decoration: none;
  font-size: 1.1rem;
  line-height: 2.2;
  position: flex;
  padding: 0.5rem;
`;

const Items = styled.div`
  color: var(--lineColor);
  text-decoration: none;
  font-size: 1.3rem;
  display: flex;
  cursor: pointer;
  padding: 0.3rem 0;
  align-items: center;
`;

const Icons = styled.div`
  display: flex;
  margin: 0 0.5rem;
`;

const Name = styled.span`
  padding: 0.2rem;
  color: var(--lineColor);
  font-size: 1rem;
  &:hover {
    color: var(--primaryColor);
  }
`;
