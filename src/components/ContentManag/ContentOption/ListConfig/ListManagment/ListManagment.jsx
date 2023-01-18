import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalListDataCreated } from "../../../../../redux/states/ActionConfig";
import ElementList from "../../ElementList/ElementList";
import ListCreated from "../ModalesList/ListCreated";

const ListManagment = () => {
  const dispatch = useDispatch();
  const { listCore } = useSelector((store) => store);
  const { ListData } = listCore;

  const OpenModalListDataCreated = () => {
    dispatch(setOpenModalListDataCreated(true));
  };

  return (
    <ItemContainer>
      <Header>
        <TitleList>Listado de datos</TitleList>
        <Nuevo onClick={() => OpenModalListDataCreated()}>Nuevo</Nuevo>
      </Header>
      
      {ListData.map((ListData, index) => (
        <ElementList
          key={index}
          con={index + 1}
          id={ListData.id}
          name={ListData.name}
        />
      ))}

      <ListCreated />
    </ItemContainer>
  );
};

export default ListManagment;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleList = styled.div`
  font-size: 1.4rem;
  padding: 0.4rem;
  color: var(--primaryColor);
  font-weight: 600;
  font-weight: bold;
`;

const Nuevo = styled.button`
  font-size: 1rem;
  border: none;
  text-decoration: none;
  font-weight: 600;
  padding: 0.4rem;
  width: 5.5rem;
  height: 2.1rem;
  border-radius: 10%;
  color: var(--white);
  background-color: var(--primaryColor);
  &:hover {
    background-color: var(--transparent);
  }
`;
