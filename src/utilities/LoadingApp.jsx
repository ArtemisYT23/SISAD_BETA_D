import styled from "styled-components";

export default function LoadingApp() {
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
  width: 100vw;
  height: 100vh;
`;

const SpinnerLoading = styled.div`
  width: 100px;
  height: 100px;
  border: 10px solid #9b9b9b; /* Light grey */
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
