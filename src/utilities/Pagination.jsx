import styled from "styled-components";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ContainerPages>
      {pageNumbers.map((number) => (
        <CeldaItem onClick={() => paginate(number)} key={number}>
          {number}
        </CeldaItem>
      ))}
    </ContainerPages>
  );
};

export default Pagination;

const ContainerPages = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CeldaItem = styled.div`
  border: 1px solid #c4c4c4;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
