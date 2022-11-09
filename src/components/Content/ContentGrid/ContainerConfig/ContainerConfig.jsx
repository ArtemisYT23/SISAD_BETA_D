import { useSelector } from "react-redux";
import IndexContainer from "./IndexContainer/IndexContainer";
import IndexDefault from "./IndexDefault/IndexDefault";


const ConfigCabinet = () => {
    const { indexCore, viewCore } = useSelector((store) => store);
    const { IndexConfig } = indexCore;
    const { selected } = viewCore;
  
    return (
      <>
        {selected === "ConfigIndex" && IndexConfig != "" ? (
          <IndexContainer />
        ) : (
          <></>
        )}
  
        {IndexConfig == "" && selected === "ConfigIndex" ? (
          <IndexDefault />
        ) : (
          <></>
        )}
      </>
    );
  };
  
  export default ConfigCabinet;