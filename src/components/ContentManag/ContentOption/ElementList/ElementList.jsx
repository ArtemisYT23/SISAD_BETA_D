import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  ElementDefault,
  AddElement,
  EditElement,
  DeleteElement,
} from "./icons";
import {
  SelectedListConfig,
  SelectedNotSelectedListConfig,
  setElementListFilterConfig,
} from "../../../../redux/states/List";
import {
  setOpenModalListElementCreated,
  setOpenModalListDataUpdate,
} from "../../../../redux/states/ActionConfig";
import ElementCreated from "./ModalesElement/ElementCreated";
import ListUpdate from "../ListConfig/ModalesList/ListUpdate";
import ItemElement from "./ItemElement/ItemElement";

const ElementList = ({ key, con, id, name, listId }) => {
  const dispatch = useDispatch();
  const { listCore } = useSelector((store) => store);
  const { SelectedList, ElementFilterList } = listCore;

  const selectElement = (index) => {
    dispatch(setElementListFilterConfig(index));
    dispatch(SelectedListConfig(index));
    const collection = document.getElementsByClassName("Celda");
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.backgroundColor = "white";
      collection[i].style.color = "#F68A20";
      if (id === index) {
        document.getElementById(index).style.backgroundColor = "#F68A20";
        document.getElementById(index).style.color = " #e9e6e6";
      }
    }
  };

  const NotSelectedList = () => {
    dispatch(SelectedNotSelectedListConfig());
  };

  const OpenModalListElementCreated = () => {
    dispatch(setOpenModalListElementCreated(true));
  };

  const OpenModalListUpdate = () => {
    dispatch(setOpenModalListDataUpdate(true));
  };

  return (
    <ElementContainerList>
      <Celda id={id} className="Celda">
        <CeldaContainer>
          <Secuencial>{con}</Secuencial>
        </CeldaContainer>
        <TitleContainer
          onClick={(e) => {
            selectElement(id);
          }}
        >
          <ListTitle>{name}</ListTitle>
        </TitleContainer>
        <IconList>
          <IconAdd
            onClick={() => {
              OpenModalListElementCreated(), selectElement(id);
            }}
          >
            <AddElement />
          </IconAdd>
          <IconAdd2
            onClick={() => {
              OpenModalListUpdate(), selectElement(id);
            }}
          >
            <EditElement />
          </IconAdd2>
          {/* <IconAdd>
              <DeleteElement />
            </IconAdd> */}
          <div onClick={() => NotSelectedList()}>
            <ElementDefault />
          </div>
        </IconList>
      </Celda>

      <ElementCreated />

      {SelectedList?.id === id && (
        <ContainerElementSecond>
          <Cabecera>
            <SecondTitle>Elementos de la lista</SecondTitle>
          </Cabecera>

          {ElementFilterList.map((ElementList, index) => (
            <ItemElement
              key={index}
              con={index + 1}
              id={ElementList.id}
              nombre={ElementList.name}
              listId={SelectedList.id}
            />
          ))}
          <ListUpdate/>
        </ContainerElementSecond>
      )}
    </ElementContainerList>
  );
};

export default ElementList;

const ElementContainerList = styled.div`
  width: 97%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Celda = styled.div`
  width: 100%;
  height: 3rem;
  border: 1px solid var(--lineColor);
  display: flex;
  justify-content: space-between;
  margin: 0.1rem 0 0.1rem 0;
  color: #c4c4c4;
`;

const CeldaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 5%;
`;

const Secuencial = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  justify-content: flex-start;
  margin: 0.7rem;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ListTitle = styled.h1`
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 0 0;
`;

const IconAdd = styled.div`
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 0.7rem 0 0.7rem;
  cursor: pointer;
`;

const IconAdd2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 0.7rem 0 0.7rem;
  cursor: pointer;
`;

const ContainerElementSecond = styled.div`
  border: 1px solid var(--lineColor);
  margin: 0.3rem 0 0.3rem 0;
  padding: 1rem;
`;

const Cabecera = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SecondTitle = styled.h1`
  font-size: 1.3rem;
  color: var(--primaryColor);
  margin: 0 0 0.8rem 0.5rem;
  text-align: center;
  justify-content: center;
  font-weight: bold;
`;
