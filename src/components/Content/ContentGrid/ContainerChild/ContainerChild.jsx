import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { setCloseContextChild } from "../../../../redux/states/ActionCore";
import ChildContext from "./ChildContext/ChildContext";
import GridChildDefault from "./GridChildDefault/GridChildDefault";
import GridChild from "./GridChild/GridChild";

const ContainerChild = () => {
  const dispatch = useDispatch();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { modalCore, viewCore, userSesion, folderCore, cabinetCore } = useSelector(
    (store) => store
  );
  const { SelectedCabinet } = cabinetCore;
  const { RolSesion, OptionsTocken } = userSesion;
  const { selected, selectedView } = viewCore;
  const { ContextChild } = modalCore;
  const { folderByFolder } = folderCore;

  const handleClick = (e) => {
    OptionsTocken.map((n, i) => {
      if (n.id == "fe8a04d3-3439-4253-81c2-17aec2474db0") {
        dispatch(setCloseContextChild(true));
      }
    });
  };

  const contextMenuRightClick = (e) => {
    e.preventDefault();
    setX(e.clientX - 50);
    setY(e.clientY - 50);
    ContextChild;
  };

  const CloseContextFolder = (context) => {
    if (context === true) {
      dispatch(setCloseContextChild(false));
    }
  };

  return (
    <>
      {ContextChild ? (
        <ChildContext x={x} y={y} cabinetId={SelectedCabinet?.id} viewMode={SelectedCabinet?.viewMode}/>
      ) : (
        <></>
      )}

      <DocumentContainer
        onClick={() => CloseContextFolder(ContextChild)}
        onContextMenu={(e) => {
          contextMenuRightClick(e), handleClick(e);
        }}
      >
        {selected === "folderChild" && selectedView != "list" ? (
          folderByFolder.map(({ id, name, description, cabinetId, folderId }, index) => (
            <GridChild
              key={index}
              id={id}
              cabinetId={cabinetId}
              name={name}
              description={description}
              folderId={folderId}
              element="folder"
            />
          ))
        ) : (
          <></>
        )}

        {selected === "folderChild" && folderByFolder == "" ? (
          <GridChildDefault />
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

export default ContainerChild;

const DocumentContainer = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  width: 98%;
  height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.5em;
  }
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
