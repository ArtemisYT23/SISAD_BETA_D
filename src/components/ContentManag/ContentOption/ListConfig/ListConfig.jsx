import styled from "styled-components";
import ListManagment from "./ListManagment/ListManagment";
import HeaderManag from "../../Header/HeaderManag";
import toast, { Toaster } from "react-hot-toast";

const ListConfig = () => {
  return (
    <ManagContainer>
      <Listado>
        <InfoContainer>
          <HeaderManag />
        </InfoContainer>
        <ListManagment />
      </Listado>

      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />
    </ManagContainer>
  );
};

export default ListConfig;

const ManagContainer = styled.div`
  padding: 1rem 0 0 0;
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
  @media (max-width: 767px) {
    height: 750px;
  }
`;

const Listado = styled.div`
  width: 100%;
  height: 600px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 767px) {
    height: 750px;
  }
`;

const InfoContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--white);
  padding: 0 0 1rem 0;
`;
