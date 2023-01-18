import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditElement, DeleteElement } from "./icons";
import {
  setOpenModalListElementUpdate,
  setOpenModalListElementDelete,
} from "../../../../../redux/states/ActionConfig";
import { setSelectedElementConfig } from "../../../../../redux/states/List";
import ElementUpdate from "../ModalesElement/ElementUpdate";
import ElementDelete from "../ModalesElement/ElementDelete";

const ItemElement = ({ id, con, nombre, listId }) => {
  const dispatch = useDispatch();
  const { listCore } = useSelector((store) => store);

  const SelectedElementList = (index) => {
    const collection = document.getElementsByClassName("Celda");
    for (let i = 0; i < collection.length; i++) {
      collection[i].style.backgroundColor = "white";
      collection[i].style.color = "#c4c4c4";
      if (id === index) {
        document.getElementById(index).style.backgroundColor = "#e9e6e6";
        document.getElementById(index).style.color = " #F68A20";
      }
    }
  };

  const OpenModalUpdateElementList = (id) => {
    dispatch(setSelectedElementConfig(id));
    dispatch(setOpenModalListElementUpdate(true));
  };

  const OpenModalDeleteElementList = (id) => {
    dispatch(setSelectedElementConfig(id));
    dispatch(setOpenModalListElementDelete(true));
  };

  return (
    <Element id={id} className="Celda" onClick={() => SelectedElementList(id)}>
      <ItemCelda>
        <Secuencial>{con}</Secuencial>
      </ItemCelda>
      <ElemTitle>
        <ElementTitle>{nombre}</ElementTitle>
      </ElemTitle>

      <IconListElement>
        <IconAddList onClick={() => OpenModalUpdateElementList(id)}>
          <EditElement />
        </IconAddList>
      </IconListElement>

      <IconListContai>
        <IconContai onClick={() => OpenModalDeleteElementList(id)}>
          <DeleteElement />
        </IconContai>
      </IconListContai>

      <ElementUpdate />

      <ElementDelete />
    </Element>
  );
};

export default ItemElement;

const Element = styled.div`
  width: 100%;
  height: 2.5rem;
  border: 1px solid var(--lineColor);
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0 0.2rem 0;
  color: #c4c4c4;
  @media (max-width: 767px) {
    height: 3.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ItemCelda = styled.div`
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

const ElemTitle = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ElementTitle = styled.h1`
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 3rem 0 0;
   @media (max-width: 767px) {
    margin: 0 1rem 0 1rem;
  }
`;

const IconListElement = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem 0 1rem;
`;

const IconAddList = styled.div`
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 0.7rem 0 0.7rem;
  cursor: pointer;
`;

const IconListContai = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem 0 1rem;
`;

const IconContai = styled.div`
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 0.7rem 0 0.7rem;
  cursor: pointer;
`;
