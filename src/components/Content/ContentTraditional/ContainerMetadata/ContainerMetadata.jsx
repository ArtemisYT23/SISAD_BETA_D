import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import TableIndexMeta from "./TableIndexMeta/TableIndexMeta"

const ContainerMetadata = () => {
  const { viewCore } = useSelector((store) => store);
  const { selectedView } = viewCore;
  return (
    <ContainerDocuView>
      {selectedView != "grid" ? <TableIndexMeta /> : <></>}
    </ContainerDocuView>
  );
};

export default ContainerMetadata;

const ContainerDocuView = styled.div`
  width: 100%;
  height: 450px;
  margin: 0.6rem 0 0 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    height: 590px;
  }
`;
