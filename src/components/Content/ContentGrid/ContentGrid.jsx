import { useSelector } from "react-redux";
import ContainerGroup from "./ContainerGroup/ContainerGroup";
import ContainerCabinet from "./ContainerCabinet/ContainerCabinet";
import ContainerFolder from "./ContainerFolder/ContainerFolder";
import ContainerDocFile from "./ContainerDocFile/ContainerDocFile";
import ContainerConfig from "./ContainerConfig/ContainerConfig";

function ContentGrid() {
  const { viewCore } = useSelector((store) => store);
  const { selected, selectedView } = viewCore;
  return (
    <>
      {selected === "group" ? <ContainerGroup /> : <></>}

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

      {selected === "folder" && selectedView === "grid" ? (
        <ContainerDocFile />
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
