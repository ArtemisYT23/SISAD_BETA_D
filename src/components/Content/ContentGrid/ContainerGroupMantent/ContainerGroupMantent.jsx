import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { setCloseMenuContextMantentGroup } from "../../../../redux/states/ActionCore";
import GroupContext from "./GroupContext/GroupContext";
import LoadingSpinner from "../../../../utilities/LoadingSpinner";
import GridMantentGroup from "./GridMantentGroup/GridMantentGroup";
import GridDefault from "../ContainerGroupMantent/GridDefaultGroup/GridDefault";

const ContainerGroupMantent = () => {
  const dispatch = useDispatch();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { userSesion, groupCore, viewCore, modalCore } = useSelector(
    (store) => store
  );
  const { isLoadingGroup, groups } = groupCore;
  const { ContextMantentGroup } = modalCore;
  const { RolSesion, OptionsTocken } = userSesion;
  const { selected, selectedView } = viewCore;

  const handleClick = (e) => {
    OptionsTocken.map((n, i) => {
      if (n.id == "d2ebaaaf-dc43-4a7f-a41b-56e78ff0c8b0") {
        dispatch(setCloseMenuContextMantentGroup(true));
      }
    });
  };

  const ContextMenuRightClick = (e) => {
    e.preventDefault();
    setX(e.clientX - 50);
    setY(e.clientY - 50);
    ContextMantentGroup;
  };

  const CloseContextGroupMantent = (context) => {
    if (context === true) {
      dispatch(setCloseMenuContextMantentGroup(false));
    }
  };

  return (
    <>
      {ContextMantentGroup ? <GroupContext x={x} y={y} /> : <></>}

      {RolSesion[2] == "Writer" && ContextMantentGroup ? (
        <GroupContext x={x} y={y} />
      ) : (
        <></>
      )}

      <DocumentContainer
        onClick={() => CloseContextGroupMantent(ContextMantentGroup)}
        onContextMenu={(e) => {
          ContextMenuRightClick(e), handleClick(e);
        }}
      >
        {selected === "GroupMantent" && selectedView != "list" ? (
          <>
            {isLoadingGroup ? (
              <LoadingSpinner />
            ) : (
              <>
                {groups.map(({ id, name }, index) => (
                  <GridMantentGroup
                    key={index}
                    id={id}
                    name={name}
                    element="group"
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <></>
        )}

        {selected === "GroupMantent" && groups == "" ? (
          <GridDefault />
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

export default ContainerGroupMantent;

const DocumentContainer = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;
