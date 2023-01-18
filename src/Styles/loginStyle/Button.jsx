import styled from "styled-components";

function Button({ content, onClick, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>{ content }</StyledButton>
  )
}

const StyledButton = styled.button`
  background: linear-gradient(to right, #efa254 0%, #fc7e00 79%);
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  width: 90%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  
  &:disabled{
    background: #ff870f83;
    cursor: default;
  }
`;

export default Button