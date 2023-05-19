import { useSelector } from "react-redux";
import SectionPreview from "./SectionPreview/SectionPreview";
import styled from "styled-components";

const Preview = () => {
  const { modalDocumentary } = useSelector((store) => store);
  const { modalPreview } = modalDocumentary;

  return (
    <ContentPreview modal={modalPreview}>
      <SectionPreview />
    </ContentPreview>
  );
};

export default Preview;

const ContentPreview = styled.div`
  width: 25%;
  height: 100vh;
  position: absolute;
  background-color: #fff;
  left: 75%;
  display: ${(props) => (props.modal ? "flex" : "none")};

  @media (max-width: 767px) {
    width: 100%;
    position: absolute;
    z-index: 1;
    background-color: #fff;
  }
`;
