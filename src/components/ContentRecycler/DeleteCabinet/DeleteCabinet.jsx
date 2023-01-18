import styled from "styled-components";
import HeaderRecycler from "../HeaderRecycler/HeaderRecycler";
import RowCabinet from "./RowCabinet/RowCabinet";

const DeleteCabinet = () => {
    return(
        <RecyclerContainer>
            <HeaderRecycler />
            <RowCabinet />
        </RecyclerContainer>
    )
}

export default DeleteCabinet;

const RecyclerContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;