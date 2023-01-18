import styled from "styled-components";
import OptionView from "./OptionView/OptionView";

const ActionChange = () => {
  return (
  <ActionsContainer>
    <ContainerVista>
        <FilterContainer />
        <OptionView />
    </ContainerVista>
  </ActionsContainer>
  );
};

export default ActionChange;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    width: 265px;
  }
`;

const ContainerVista = styled.div`
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterContainer = styled.div`
  width: 85%;
  height: 100%;
`;
