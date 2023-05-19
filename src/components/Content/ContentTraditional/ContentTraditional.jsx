import { useSelector } from "react-redux";
import ContainerMetadata from "./ContainerMetadata/ContainerMetadata";

const ContentTraditional = () => {
  const { viewCore } = useSelector((store) => store);
  const { selected, selectedSearch, selectedView } = viewCore;
  return (
    <>
      {selected === "" || selected === "cabinet" || selected === "folder" || selected == "folderChild" ? (
        <ContainerMetadata />
      ) : (
        <></>
      )}
    </>
  );
};

export default ContentTraditional;