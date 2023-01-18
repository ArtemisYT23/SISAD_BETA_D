import styled from "styled-components";
import HeaderRecycler from "../HeaderRecycler/HeaderRecycler";
import RowGroup from "./RowGroup/RowGroup";

const DeleteGroup = () => {
  return (
    <RecyclerContainer>
      <HeaderRecycler />
      <RowGroup />
    </RecyclerContainer>
  );
};

export default DeleteGroup;

const RecyclerContainer = styled.div`
  width: 100%;
`;
