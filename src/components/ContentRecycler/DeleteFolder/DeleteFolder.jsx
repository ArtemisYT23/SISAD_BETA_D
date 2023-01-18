import styled from "styled-components";
import HeaderRecycler from "../HeaderRecycler/HeaderRecycler";
import RowFolder from "./RowFolder/RowFolder";

const DeleteFolder = () => {
    return (
        <RecyclerContainer>
            <HeaderRecycler />
            <RowFolder />
        </RecyclerContainer>
    )
}

export default DeleteFolder;

const RecyclerContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;