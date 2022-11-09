import styled from "styled-components";

export default function LoadingSpinner() {
  return (
    <ContainerSpinner>
      <SpinnerLoading />
    </ContainerSpinner>
  );
}

const ContainerSpinner = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SpinnerLoading = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid var(--primaryColor); /* Blue */
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
