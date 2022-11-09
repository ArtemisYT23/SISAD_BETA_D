import styled from "styled-components";
import Search from "./Search/Search";

function Aside() {
  return (
    <DocumentaryAsideContainer>
      <Search />
    </DocumentaryAsideContainer>
  );
}

export default Aside;

const DocumentaryAsideContainer = styled.div`
  width: 15rem;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: -0.5rem 0 1.5rem -0.5rem rgba(0, 0, 0, 0.2);
  padding: 2rem 1rem;
  overflow-y: scroll;
`;
