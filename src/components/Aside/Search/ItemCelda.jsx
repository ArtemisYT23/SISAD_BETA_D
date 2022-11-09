import styled from "styled-components";
import IconSearch from "./Icons";

const ItemCelda = ({ id, name, element }) => {
  const selectGroup = (index) => {
    const collection = document.getElementsByClassName("Celda");
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.backgroundColor = "white";
      collection[i].style.color = "#939393";
      if (id === index) {
        document.getElementById(index).style.backgroundColor = "#F68A20";
        document.getElementById(index).style.color = "#e9e6e6";
      }
    }
  };

  return (
    <Celda id={id} className="Celda" onClick={() => selectGroup(id)}>
      <Icons>
        <IconSearch element={element} />
      </Icons>
      <Name>{name}</Name>
    </Celda>
  );
};

export default ItemCelda;

const Icons = styled.div`
  display: flex;
  margin: 0 0.3rem 0 0.8rem;
`;

const Name = styled.span`
  font-size: 0.9rem;
  padding: 0.3rem;
`;

const Celda = styled.div`
  color: var(--lineColor);
  text-decoration: none;
  font-size: 1.3rem;
  display: flex;
  cursor: pointer;
  margin: 0.4rem 0 0.4rem 0;
  align-items: center;
  text-align: left;
`;
