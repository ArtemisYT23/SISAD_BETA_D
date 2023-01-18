import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListIcon } from "./Icons";
import { setSelectedOptionsSecurityConfig } from "../../../../redux/states/OptionsMenu";
import { PrivateRoutes } from "../../../../models/routes";

const MenuSecurity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userSesion } = useSelector((store) => store);
  const { RolSesion } = userSesion;

  const selectOptions = (name, n) => {
    navigate(`${name}`);
  };

  return (
    <SearchContainer>
      <ul>
        <List>
          <Titulo>Seguridades</Titulo>
          <Items
            onClick={() =>
              selectOptions(PrivateRoutes.INFOUSER, "Informacion de Usuario")
            }
          >
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Informacion de Usuario</Name>
          </Items>
        </List>

        <List>
          <Items onClick={() => selectOptions(PrivateRoutes.PROFILE, "Perfiles")}>
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Perfiles</Name>
          </Items>
        </List>

        <List>
          <Items onClick={() => selectOptions(PrivateRoutes.RESOURCE, "Recursos")}>
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Recursos</Name>
          </Items>
        </List>

        <List>
          <Items onClick={() => selectOptions(PrivateRoutes.USER, "Usuarios")}>
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Usuarios</Name>
          </Items>
        </List>

        <List>
          <Items onClick={() => selectOptions(PrivateRoutes.ACTIONHISTORY, "Historial De Acciones")}>
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Historial De Acciones</Name>
          </Items>
        </List>

      </ul>
    </SearchContainer>
  );
};

export default MenuSecurity;

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
