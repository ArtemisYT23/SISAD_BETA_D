import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { NotIndexContent } from "./Icons";
import toast, { Toaster } from "react-hot-toast";

const IndexDefault = () => {
  const dispatch = useDispatch();
  const { cabinetCore } = useSelector((store) => store);
  const { SelectedCabinet } = cabinetCore;

  const OpenConfigModalIndex = () => {
    // dispatch(setOpenModalConfigCreated());
  };

  return (
    <DefaultIndex>
      <ContentColumn>
        <NotIndexContent />
        <TitleIndex>Sin Índices</TitleIndex>

        <ContainerButton>
          <ButtonNewIndex onClick={() => OpenConfigModalIndex()}>
            Nuevo Indice
          </ButtonNewIndex>
        </ContainerButton>

        {/* <IndexCreated/> */}
      </ContentColumn>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />
    </DefaultIndex>
  );
};

export default IndexDefault;

const DefaultIndex = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TitleIndex = styled.h1`
  font-size: 2rem;
  justify-content: center;
  text-align: center;
  color: #c4c4c4;
`;

const ContainerButton = styled.div`
  width: 100%;
  padding: 0.7rem;
`;

const ButtonNewIndex = styled.button`
  border: 1px solid #c4c4c4;
  width: 65%;
  padding: 0.4rem;
  color: #c4c4c4;
  background: none;
  border-radius: 2rem 2rem 2rem 2rem;
  &:hover {
    color: white;
    background-color: #f68a20;
    border: none;
  }
`;
