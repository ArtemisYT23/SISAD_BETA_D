import { useSelector } from "react-redux";
import GridCabinet from "../GridCabinet/GridCabinet";

const CabinetRender = () => {
  const { cabinetCore } = useSelector((store) => store);
  const { cabinets } = cabinetCore;

  return (
    <>
      {cabinets.map(({ id, name, description, fileTypes }, index) => (
        <GridCabinet
          key={index}
          id={id}
          name={name}
          description={description}
          fileTypes={fileTypes}
          element="cabinet"
        />
      ))}
    </>
  );
};

export default CabinetRender;
