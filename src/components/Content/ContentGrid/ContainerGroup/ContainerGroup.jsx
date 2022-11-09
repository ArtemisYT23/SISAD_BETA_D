import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import GridDefaultGroup from "./GridDefaultGroup/GridDefaultGroup";
import GridGroup from "./GridGroup/GridGroup";

function ContainerGroup() {
  const { groupCore, viewCore } = useSelector((store) => store);

  const { GroupsCabinet } = groupCore;
  const { selected, selectedView } = viewCore;

  return (
    <DocumentContainer>
      {selected === "group" && selectedView != "list" ? (
        GroupsCabinet.map(({ id, name, description, groupId }, index) => (
          <GridGroup
            key={index}
            id={id}
            name={name}
            element="cabinet"
            description={description}
            groupId={groupId}
          />
        ))
      ) : (
        <></>
      )}

      {selected === "group" && GroupsCabinet == "" ? (
        <GridDefaultGroup />
      ) : (
        <></>
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
    </DocumentContainer>
  );
}

export default ContainerGroup;

const DocumentContainer = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;
