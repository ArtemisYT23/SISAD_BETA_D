import styled from "styled-components";
import Search from "./Search/Search";
import SearchMetadata from "./SearchMetadata/SearchMetadata";
import { useSelector } from "react-redux";
import ActiveMenu from "./Search/ActiveMenu";

function Aside() {
  const { viewCore, modalCore } = useSelector((store) => store);
  const { selectedView } = viewCore;
  const { isOpenCore } = modalCore;

  return (
    <DocumentaryAsideContainer>
      {isOpenCore ? (
        <>
          {selectedView === "" || selectedView === "grid" ? <Search /> : <></>}

          {selectedView === "list" ? <SearchMetadata /> : <></>}
        </>
      ) : (
        <></>
      )}
      <ActiveMenu/>
    </DocumentaryAsideContainer>
  );
}

export default Aside;

const DocumentaryAsideContainer = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: -0.5rem 0 1.5rem -0.5rem rgba(0, 0, 0, 0.2);
  display: flex;
`;
