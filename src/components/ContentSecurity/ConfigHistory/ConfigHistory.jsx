import styled from "styled-components";
import HistoryUser from "./HistoryUser/HistoryUser";

const PanelHistoryUser = () => {
  return (
    <PanelHistoryContainer>
      <HistoryUser />
    </PanelHistoryContainer>
  );
};

export default PanelHistoryUser;

const PanelHistoryContainer = styled.div`
  padding: 1rem 0 0 0;
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: center;
`;
