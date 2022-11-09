import { useSelector } from "react-redux";
import GridCabinet from "../GridCabinet/GridCabinet";

const CabinetDefaultRender = () => {
  const { cabinetCore } = useSelector((store) => store);
  const { cabinets } = cabinetCore;
  return (
    <>
        {cabinets.map(({ id, name, description, path }, index) => (
          <GridCabinet
            key={index}
            id={id}
            name={name}
            description={description}
            path={path}
            element="cabinet"
          />
        ))}
    </>
  );
};

export default CabinetDefaultRender;
