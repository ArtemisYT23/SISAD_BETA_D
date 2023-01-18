import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 13.3rem;
  height: 100vh;
  display: flex;
  overflow-y: scroll;
  justify-content: center;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchInput = styled.input`
  width: 90%;
  height: 5.5%;
  outline: none;
  border: none;
  margin: 0 .3rem 0 0;
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
  display: flex;
  align-items: center;
`;

export const Rec = styled.div`
  padding: 0;
`;
