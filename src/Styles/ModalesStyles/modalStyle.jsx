import styled from "styled-components";

export const TitleModal = styled.span`
  color: var(--primaryColor);
  font-size: 1.4rem;
  padding: 0 0 0.5rem 0;
`;

export const TitleArchive = styled.span`
  color: var(--primaryColor);
  font-size: 1rem;
  margin: 0.2rem 0 0.2rem 0;
`;

export const SaveButton = styled.button`
  color: var(--primaryColor);
  text-decoration: none;
  outline: none;
  border: none;
  font-size: 1.1rem;
  margin: 0.5rem;
  background: var(--white);
`;

export const CancelButton = styled.button`
  color: var(--lineColor);
  text-decoration: none;
  outline: none;
  border: none;
  font-size: 1.1rem;
  margin: 0.5rem;
  background: var(--white);
  cursor: pointer;
`;

export const Selected = styled.select`
  width: 100%;
  height: 2em;
  text-align: center;
  color: var(--primaryColor);
  border: 1px solid var(--primaryColor);
  outline: none;
`;

export const NameCelda = styled.div`
  display: flex;
`;

export const ContainerCheckDefault = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #5d5b5b;
  padding: 0.1rem;
`;

export const ContainerNameCheck = styled.div`
  width: 100%;
  height: 100px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #5d5b5b;
  padding: 0.1rem;
`;

export const IconAlert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlertDelete = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.1rem;
  border: 2px solid var(--primaryColor);
  color: var(--primaryColor);
  padding: 0.3rem;
  margin: 0.2rem;
`;

export const AcepDelete = styled.div`
  border: 1px solid #f68a20;
  margin: 0.5rem;
  padding: 0.2rem;
  width: 40%;
  border-radius: 0.5rem;
  color: #868585;
  &:hover{
    background-color: #f68a20;
    color: white;
  }
`;

export const ContaiderButton = styled.div`
    display: flex;
    justify-content: center;
`;

export const ButtonDelete = styled.button`
  color: #f68a20;
  text-decoration: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.1rem;
  border: 1px solid #f68a20;
  margin: 0.5rem;
  cursor: pointer;
  background: none;
  &:disabled{
    background-color: #f68b2027;
    border: 1px solid #f68b203f;
    color: #f68b2075;
  }
`;

export const ButtonCancel = styled.div`
  color: #949494;
  text-decoration: none;
  border: 1px solid #f68a20;
  outline: none;
  padding: 0.5rem;
  font-size: 1.1rem;
  margin: 0.5rem;
  background: none;
  cursor: pointer;
  &:hover {
    color: #868585;
    border: 2px solid #f3810e;
  }
`;
