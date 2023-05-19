import styled from "styled-components";
import IndexContent from "./IndexContent/IndexContent";
import HeaderManag from "../../Header/HeaderManag";
import toast, { Toaster } from "react-hot-toast";

const FileTypeConfig = () => {
  return (
    <IndexContainer>
      <Listado>
        
          <HeaderManag />
       
        <IndexContent />
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
    </IndexContainer>
  );
};

export default FileTypeConfig;

const IndexContainer = styled.div`
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--white);
`;
const Listado = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
