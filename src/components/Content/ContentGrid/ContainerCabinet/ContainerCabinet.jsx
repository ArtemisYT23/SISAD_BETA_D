import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import CabinetContext from "./CabinetContext/CabinetContext";
import CabinetDefaultRender from "./CabinetDefaultRender/CabinetDefaultRender";
import CabinetRender from "./CabinetRender/CabinetRender";
import { setCloseMenuContextGroup } from "../../../../redux/states/ActionCore";


import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import Loader from "../../../../utilities/Loader";

const ContainerCabinet = () => {
  const dispatch = useDispatch();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { userSesion, cabinetCore, viewCore, modalCore } = useSelector(
    (store) => store
  );
  const { isLoadingCabinet } = cabinetCore;
  const { ContextGroup } = modalCore;
  const { RolSesion, OptionsTocken } = userSesion;
  const { selected, selectedView } = viewCore;

  const handleClick = (e) => {
    OptionsTocken.map((n, i) => {
      if (n.id == "314e90cc-7f66-4d13-80ed-509c0b82283c") {
        dispatch(setCloseMenuContextGroup(true));
      }
    });
  };

  const contextMenuRightClick = (e) => {
    e.preventDefault();
    setX(e.clientX - 50);
    setY(e.clientY - 50);
    ContextGroup;
  };

  const CloseContextCabinet = (context) => {
    if (context === true) {
      dispatch(setCloseMenuContextGroup(false));
    }
  };

  
  return (
    <>
      {ContextGroup ? <CabinetContext x={x} y={y} /> : <></>}

      <DocumentContainer
        onClick={() => CloseContextCabinet(ContextGroup)}
        onContextMenu={(e) => {
          contextMenuRightClick(e), handleClick(e);
        }}
      >
        {selected === "CabinetAll" && selectedView != "list" ? (
          <>{isLoadingCabinet ? <LoadingSpinner /> : <CabinetRender />}</>
        ) : (
          <></>
        )}

        {selected === "" && selectedView != "list" ? (
          <>
            {isLoadingCabinet ? <Loader /> : <CabinetDefaultRender />}
          </>
        ) : (
          <></>
        )}

        <Toaster
          position="top-right"
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

export default ContainerCabinet;

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
