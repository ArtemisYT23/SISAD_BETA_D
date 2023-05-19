import styled from "styled-components";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import ActionChange from "./ActionChange/ActionChange";
import ContentGrid from "./ContentGrid/ContentGrid";
import ContentTraditional from "./ContentTraditional/ContentTraditional";
import { Cabinet } from "../../pages/Private/Documentary/Cabinet";

const Content = () => {
  const { viewCore } = useSelector((store) => store);
  const { selectedView } = viewCore;
  return (
    <ContentContainer>
      {/* <InfoContainer> */}
        <Header />
        <ActionChange />
      {/* </InfoContainer> */}

      {selectedView === "grid" ? <ContentGrid /> : <></>}

      {selectedView === "list" ? <ContentTraditional /> : <></>}
      
    </ContentContainer>
  );
};

export default Content;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 767px) {
    padding:  0;
  }
`;

const InfoContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--white);
`;
