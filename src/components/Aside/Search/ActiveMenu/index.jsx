import styled from "styled-components";
import IconDer from "../../../../../assets/Img/Core/flecha.png";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalCore } from "../../../../redux/states/ActionCore";
import { Tooltip } from "@material-ui/core";

const ActiveMenu = () => {
  const dispatch = useDispatch();
  const { modalCore } = useSelector((store) => store);
  const { isOpenCore } = modalCore;

  const handleClick = () => {
    dispatch(setOpenModalCore(!isOpenCore));
  };

  return (
    <ContainerBreak>
      <Tooltip title="Menu">
        <Break onClick={() => handleClick()}>
          <ImagenIcon isOpen={isOpenCore} src={IconDer} alt="Cargando" />
        </Break>
      </Tooltip>
    </ContainerBreak>
  );
};

export default ActiveMenu;

const ContainerBreak = styled.div`
  width: 1.4rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Break = styled.div`
  width: 120px;
  height: 20px;
  overflow: hidden;
  transform: rotate(90deg);
  border: none;
  border-radius: 25px 25px 0 0;
  cursor: pointer;
  background-color: var(--primaryColor);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagenIcon = styled.img`
  width: 25px;
  height: 25px;
  transform: ${(props) => props.isOpen ? "rotate(90deg)" : "rotate(-90deg)"};
`;
