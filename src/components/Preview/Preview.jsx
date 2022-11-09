import { useSelector } from "react-redux";
import SectionPreview from "./SectionPreview/SectionPreview";

const Preview = () => {
  const { modalDocumentary } = useSelector((store) => store);
  const { modalPreview } = modalDocumentary;

  const style = () => {
    return {
      width: "37%",
      height: "100vh",
      position: "sticky",
      display: modalPreview ? "flex" : "none",
      top: "0",
      left: "0",
      overflow: "scroll-y",
    };
  };
  return (
    <div style={style()}>
      <SectionPreview />
    </div>
  );
};

export default Preview;
