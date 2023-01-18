import styled from "styled-components";
import MenuManagment from "./MenuManagment/MenuManagment";
import ActiveMenu from "./ActiveMenu";
import { useSelector } from "react-redux";

const AsideManag = () => {
  const { modalCore } = useSelector((store) => store);
  const { isOpenManag } = modalCore;

  return (
    <ManagmentAsideContainer>
       {isOpenManag != false && <MenuManagment /> } 
      <ActiveMenu />
    </ManagmentAsideContainer>
  );
};

export default AsideManag;

const ManagmentAsideContainer = styled.div`
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
