import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { SearchFilter, RestoredElement } from "./icons";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import {
  getAllDeleteFileTypeRestored,
  RestoredFileType,
} from "../../../../redux/formData/ResourceData";

const RowFileType = () => {
  const dispatch = useDispatch();
  const { dataResult } = useSelector((store) => store);
  const { isLoadingRestored, fileTypeRestored } = dataResult;
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (fileTypeRestored == "") {
      dispatch(getAllDeleteFileTypeRestored());
    }
  }, []);

  const restoredFileTypeSelected = (index) => {
    dispatch(RestoredFileType(index));
  };

  function searchingTerm(term) {
    return function (x) {
      return x.name.toLowerCase().includes(term) || !term;
    };
  }

  return (
    <ContainerFileTypeDelete>
      <HeadersContainer>
        <ContainerButton>
          <SearchUser
            placeholder=" Buscar Tipo De Archivo"
            onChange={(e) => setTerm(e.target.value)}
          />
          <ButtonSearch>
            <SearchFilter x={22} y={22} />
          </ButtonSearch>
        </ContainerButton>
      </HeadersContainer>
      <br />

      {isLoadingRestored ? (
        <LoadingSpinner />
      ) : (
        <TableContainer>
          <TableRaid>
            <table>
              <tr>
                <THN>N</THN>
                <TH>Recurso</TH>
                <TH>Nombre</TH>
                <TH>Descripcion</TH>
                <TH>Restaurar</TH>
              </tr>

              {fileTypeRestored ? (
                fileTypeRestored.filter(searchingTerm(term)).map((file, i) => (
                  <tr key={i}>
                    <TD1>{i + 1}</TD1>
                    <TD1>TIPO DE ARCHIVO</TD1>
                    <TD1>{file.name}</TD1>
                    <TD1>{file.description}</TD1>
                    <TD1>
                      <ContentOptions>
                        <ButtonOptions
                          onClick={() => restoredFileTypeSelected(file.id)}
                        >
                          <RestoredElement x={30} y={30} />
                        </ButtonOptions>
                      </ContentOptions>
                    </TD1>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </table>
          </TableRaid>
        </TableContainer>
      )}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#F68A20",
            color: "#fff",
          },
        }}
      />
    </ContainerFileTypeDelete>
  );
};

export default RowFileType;

const ContainerFileTypeDelete = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 1rem 0 0 0;
`;

const HeadersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ContainerButton = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
`;

const SearchUser = styled.input`
  width: 45%;
  height: 2rem;
  outline: none;
  border: 1px solid #f68a20;
  color: #5d5c5c;
  @media (max-width: 767px) {
    width: 60%;
  }
`;

const ButtonSearch = styled.button`
  padding: 0.5rem;
  width: 2.2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f68a20;
  background: none;
`;

const TableContainer = styled.div`
  width: 95%;
  display: flex;
  overflow: hidden;
`;

const TableRaid = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
`;

const THN = styled.th`
  width: 4rem;
  height: 2rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const TH = styled.th`
  width: 12rem;
  height: 2.1rem;
  border: 1px solid var(--whiteTrans);
  background-color: var(--primaryColor);
  color: var(--white);
`;

const TD1 = styled.td`
  font-size: 0.9rem;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #5f5f5f;
  height: 2.4rem;
  border: 1px solid #c4c4c4;
`;

const ContentOptions = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonOptions = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;