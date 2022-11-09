import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 5.5%;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--lineColor);
  font-size: 1rem;
  text-align: center-start;
  background-color: var(--white);
  color: var(--black);
  &:placeholder {
    color: var(--lineColor);
  }
`;

export const List = styled.li`
  text-decoration: none;
  list-style: none;
`;

export const Titulo = styled.span`
  font-weight: 600;
  text-align: center left;
  text-decoration: none;
  font-size: 1.1rem;
  line-height: 2.2;
  position: flex;
  padding: 0.5rem;
  color: var(--primaryColor);
`;

export const Rec = styled.div`
  padding: 0;
`;
