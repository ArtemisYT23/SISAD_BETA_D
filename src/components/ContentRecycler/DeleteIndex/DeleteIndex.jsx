import styled from "styled-components";
import HeaderRecycler from "../HeaderRecycler/HeaderRecycler";
import RowIndex from "./RowIndex/RowIndex";

const DeleteIndex = () => {
    return (
        <RecyclerContainer>
            <HeaderRecycler />
            <RowIndex />
        </RecyclerContainer>
    )
}

export default DeleteIndex;

const RecyclerContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;