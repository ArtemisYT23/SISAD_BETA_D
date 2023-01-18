import styled from "styled-components";

function Input({ type, placeholder, onChange }) {
  return <StyledInput type={type} placeholder={placeholder} onChange={onChange} />;
}

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 320px;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #f68a20;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #08070a99;
    font-weight: 100;
    font-size: 1rem;
  }
`;

export default Input;
