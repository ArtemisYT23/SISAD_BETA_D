import styled from "styled-components";

export default function Loader() {
  return (
    <ContentCircle>
      <Circle />
      <Circle />
      <Circle />
      <Circle />
    </ContentCircle>
  );
}

const Circle = styled.div`
  width: 30px;
  height: 30px;
  animation: bounce 1s 0.7s linear infinite;
  border-radius: 100%;
  margin: 10px;

  @keyframes bounce {
    0%,
    50%,
    100% {
      transform: scale(1);
      filter: blur(0px);
    }
    25% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(1.4);
      background-color: var(--primaryColor);
    }
  }
`;

const ContentCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  height: 75vh;
`;
