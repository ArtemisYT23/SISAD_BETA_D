import { useSelector } from "react-redux";
import ContainerGroup from "./ContainerGroup/ContainerGroup";
import ContainerCabinet from "./ContainerCabinet/ContainerCabinet";
import ContainerFolder from "./ContainerFolder/ContainerFolder";
import ContainerChild from "./ContainerChild/ContainerChild";
import ContainerDocFile from "./ContainerDocFile/ContainerDocFile";
import ContainerConfig from "./ContainerConfig/ContainerConfig";
import ContainerSearch from "./ContainerSearch/ContainerSearch";
import ContainerGroupMantent from "./ContainerGroupMantent/ContainerGroupMantent";

function ContentGrid() {
  const { viewCore, userSesion } = useSelector((store) => store);
  const { selected, selectedView } = viewCore;

  return (
    <>
      {selected === "group" ? <ContainerGroup /> : <></>}

      {selected === "GroupMantent" ? <ContainerGroupMantent /> : <></>}

      {selected === "" || selected === "CabinetAll" ? (
        <ContainerCabinet />
      ) : (
        <></>
      )}

      {selected === "cabinet" && selectedView === "grid" ? (
        <ContainerFolder />
      ) : (
        <></>
      )}

      {selected === "folderChild" && selectedView === "grid" ? (
        <ContainerChild />
      ) : (
        <></>
      )}

      {selected === "folder" && selectedView === "grid" ? (
        <ContainerDocFile />
      ) : (
        <></>
      )}

      {selected === "search" && selectedView === "grid" ? (
        <ContainerSearch />
      ) : (
        <></>
      )}

      {selected === "ConfigIndex" && selectedView === "grid" ? (
        <ContainerConfig />
      ) : (
        <></>
      )}
    </>
  );
}

export default ContentGrid;
