import styled from "styled-components";
import HeaderRecycler from "../HeaderRecycler/HeaderRecycler";
import RowFileType from "./RowFileType/RowFileType";

const DeleteFileType = () => {
    return (
        <RecyclerContainer>
            <HeaderRecycler />
            <RowFileType />
        </RecyclerContainer>
    )
}

export default DeleteFileType;

const RecyclerContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;