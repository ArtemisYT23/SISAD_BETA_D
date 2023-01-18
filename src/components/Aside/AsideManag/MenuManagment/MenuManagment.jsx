import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ListIcon } from "./icons";
import { getNameManagmentChange } from "../../../../redux/states/Name";
import { PrivateRoutes } from "../../../../models/routes";
import { useNavigate } from "react-router-dom";

const MenuManagment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const selectOptions = (name, n) => {
    dispatch(getNameManagmentChange(n));
    navigate(`${name}`);
  };

  return (
    <SearchContainer>
      <ul>
        <List>
          <Titulo>Mantenimiento</Titulo>
          <Items onClick={() => selectOptions(PrivateRoutes.LIST, "Lista De Datos")}>
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Listas</Name>
          </Items>
        </List>

        <List>
          <Items onClick={() => selectOptions(PrivateRoutes.FILETYPE, "Tipo De Archivos")}>
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Tipo De Archivos</Name>
          </Items>
        </List>

        <List>
          <Items onClick={() => selectOptions(PrivateRoutes.DATATYPE, "Tipo De Datos")}>
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Tipo De Datos</Name>
          </Items>
        </List>

        <List>
          <Items onClick={() => selectOptions(PrivateRoutes.INDEXES, "Indices")}>
            <Icons>
              <ListIcon />
            </Icons>
            <Name>Indices</Name>
          </Items>
        </List>
      </ul>
    </SearchContainer>
  );
};

export default MenuManagment;
const SearchContainer = styled.div`
  width: 10rem;
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
