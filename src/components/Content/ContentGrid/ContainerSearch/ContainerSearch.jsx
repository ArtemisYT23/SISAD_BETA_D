import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridGroup from "../ContainerGroup/GridGroup/GridGroup";
import GridCabinet from "../ContainerCabinet/GridCabinet/GridCabinet";
import GridFiles from "../ContainerDocFile/ContainerFile/GridFiles/GridFiles";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";

const ContainerSearch = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { filesCore, folderCore, cabinetCore, viewCore } = useSelector(
    (store) => store
  );
  const { SearchFiles, isLoadingFilesSearch } = filesCore;
  const { SearchFolder, isLoadingSearchFolder } = folderCore;
  const { SearchCabinet, isLoadingSearchCabinet } = cabinetCore;
  const { selectedView } = viewCore;
  return (
    <DocumentContainer onClick={() => console.log(active)}>
      <ContainerSearchCabinet>
        <ContainerText>
          <TextTitle>Gabinetes</TextTitle>
        </ContainerText>
        {isLoadingSearchCabinet ? (
          <LoadingSpinner />
        ) : (
          <>
            {selectedView != "list" ? (
              SearchCabinet.map(({ id, name, description }, index) => (
                <GridGroup
                  key={index}
                  id={id}
                  name={name}
                  description={description}
                  element="cabinet"
                />
              ))
            ) : (
              <></>
            )}
          </>
        )}
      </ContainerSearchCabinet>

      <ContainerSearchFolder>
        <ContainerText>
          <TextTitle>Carpetas</TextTitle>
        </ContainerText>
        {isLoadingSearchFolder ? (
          <LoadingSpinner />
        ) : (
          <>
            {selectedView != "list" ? (
              SearchFolder.map(
                ({ id, name, description, cabinetId }, index) => (
                  <GridCabinet
                    key={index}
                    id={id}
                    cabinetId={cabinetId}
                    name={name}
                    description={description}
                    element="folder"
                  />
                )
              )
            ) : (
              <></>
            )}
          </>
        )}
      </ContainerSearchFolder>

      <ContainerFiles>
        <ContainerText>
          <TextTitle>Archivos</TextTitle>
        </ContainerText>
        {isLoadingFilesSearch ? (
          <LoadingSpinner />
        ) : (
          <>
            {selectedView != "list" ? (
              SearchFiles.map(
                (
                  {
                    id,
                    extension,
                    name,
                    description,
                    fileTypeId,
                    fileTypeName,
                    documentId,
                    file,
                  },
                  index
                ) => (
                  <GridFiles
                    key={index}
                    id={id}
                    extension={extension}
                    fileTypeId={fileTypeId}
                    documentId={documentId}
                    name={name}
                    fileTypeName={fileTypeName}
                    description={description}
                    file={file}
                    element="archivos"
                  />
                )
              )
            ) : (
              <></>
            )}
          </>
        )}
      </ContainerFiles>

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
    </DocumentContainer>
  );
};

export default ContainerSearch;

const DocumentContainer = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const ContainerSearchCabinet = styled.div`
  width: 100%;
  margin: 0 0 1rem 0;
  border: 1px solid #c4c4c4;
  padding: 1rem;
`;

const ContainerText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem;
  border: 1px solid #c4c4c4;
`;

const TextTitle = styled.span`
  color: var(--primaryColor);
  font-size: 1.2rem;
  font-weight: bold;
`;

const ContainerSearchFolder = styled.div`
  width: 100%;
  margin: 0 0 1rem 0;
  border: 1px solid #c4c4c4;
  padding: 1rem;
`;

const ContainerFiles = styled.div`
  width: 100%;
  border: 1px solid #c4c4c4;
  padding: 1rem;
`;