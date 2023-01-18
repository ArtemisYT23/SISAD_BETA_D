import styled from "styled-components";
import MenuRestauration from "./MenuRestauration/MenuRestauration";
import { useSelector } from "react-redux";
import ActiveMenu from "./ActiveMenu";

const AsideRecycler = () => {
  const { modalCore } = useSelector((store) => store);
  const { isOpenRestored } = modalCore;
  return (
    <RecyclerAsideContainer>
      {isOpenRestored ? <MenuRestauration /> : <></>}
      <ActiveMenu />
    </RecyclerAsideContainer>
  );
};

export default AsideRecycler;

const RecyclerAsideContainer = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: -0.5rem 0 1.5rem -0.5rem rgba(0, 0, 0, 0.2);
  display: flex;
  @media (max-width: 767px) {
    height: 0;
  }
`;
