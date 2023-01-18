import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { setCloseContextFolder } from "../.././../../redux/states/ActionCore";
import GridFolder from "./GridFolder/GridFolder";
import GridDefaultFolder from "./GridDefaultFolder/GridDefaultFolder";
import FolderContext from "./FolderContext/FolderContext";

const ContainerFolder = () => {
  const dispatch = useDispatch();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { modalCore, cabinetCore, folderCore, viewCore, userSesion } =
    useSelector((store) => store);
  const { SelectedCabinet } = cabinetCore;
  const { folderCabinet } = folderCore;
  const { selected, selectedView } = viewCore;
  const { ContextFolder } = modalCore;
  const { RolSesion, OptionsTocken } = userSesion;

  const handleClick = (e) => {
    OptionsTocken.map((n, i) => {
      if (n.id == "fe8a04d3-3439-4253-81c2-17aec2474db0") {
        dispatch(setCloseContextFolder(true));
      }
    });
  };

  const contextMenuRightClick = (e) => {
    e.preventDefault();
    setX(e.clientX - 50);
    setY(e.clientY - 50);
    ContextFolder;
  };

  const CloseContextFolder = (context) => {
    if (context === true) {
      dispatch(setCloseContextFolder(false));
    }
  };

  return (
    <>
      {ContextFolder ? (
        <FolderContext x={x} y={y} cabinetId={SelectedCabinet?.id} />
      ) : (
        <></>
      )}


      <DocumentContainer
        onClick={() => CloseContextFolder(ContextFolder)}
        onContextMenu={(e) => {
          contextMenuRightClick(e), handleClick(e);
        }}
      >
        {selected === "cabinet" && selectedView != "list" ? (
          folderCabinet.map(({ id, name, description, cabinetId }, index) => (
            <GridFolder
              key={index}
              id={id}
              cabinetId={cabinetId}
              name={name}
              description={description}
              element="folder"
            />
          ))
        ) : (
          <></>
        )}

        {selected === "cabinet" && folderCabinet == "" ? (
          <GridDefaultFolder />
        ) : (
          <></>
        )}

        

        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "",
            duration: 3500,
            style: {
              background: "#F68A20",
              color: "#fff",
            },
          }}
        />
      </DocumentContainer>
    </>
  );
};

export default ContainerFolder;

const DocumentContainer = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    width: 100%;
    justify-content: space-around;
    overflow: hidden;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 130px 130px;
  }
`;
