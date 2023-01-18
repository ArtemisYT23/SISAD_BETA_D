import styled from "styled-components";
import HeaderRecycler from "../HeaderRecycler/HeaderRecycler";
import RowTypeData from "./RowTypeData/RowTypeData";

const DeleteTypeData = () => {
    return (
        <RecyclerContainer>
            <HeaderRecycler />
            <RowTypeData />
        </RecyclerContainer>
    )
}

export default DeleteTypeData;

const RecyclerContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;