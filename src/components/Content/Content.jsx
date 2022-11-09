import styled from "styled-components";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import ContentGrid from "./ContentGrid/ContentGrid";
import { Cabinet } from "../../pages/Private/Documentary/Cabinet";

const Content = () => {
  const { viewCore } = useSelector((store) => store);
  const { selectedView } = viewCore;
  return (
    <ContentContainer>
      <InfoContainer>
        <Header />
      </InfoContainer>

      {selectedView === "grid" ? <ContentGrid /> : <></>}
      
    </ContentContainer>
  );
};

export default Content;

const ContentContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;

const InfoContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--white);
`;
