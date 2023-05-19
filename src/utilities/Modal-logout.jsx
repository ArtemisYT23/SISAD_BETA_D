import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeSesionCleaningState } from "../redux/states/Name";
import { setOpenLogoutAlert } from "../redux/states/ActionDocumentary";
import { useNavigate } from "react-router-dom";

const useStyless = makeStyles((theme) => ({
  modalExit: {
    position: "absolute",
    width: "400px",
    height: "200px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    overflowY: "scroll",
    borderRadius: "13px",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

export const ModalLogout = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modalDocumentary } = useSelector((store) => store);
  const { ModalLogout } = modalDocumentary;

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setOpenLogoutAlert(false));
    // dispatch(closeSesionCleaningState());
    navigate("/");
    location.reload();
  }

  const LogoutContainer = (
    <div className={styless.modalExit}>
      <ContainerInfo>
        <span>Su Tiempo de sesión ha expirado!</span>
        <button onClick={(e) => handleClick(e)}>Volver A Iniciar Sesión</button>
      </ContainerInfo>
    </div>
  );

  return (
    <div className={styless.container}>
      <Modal open={ModalLogout}>{LogoutContainer}</Modal>
    </div>
  );
};

const ContainerInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    span {
        font-weight: bold;
    }

    button {
        border: none;
        margin: 1rem;
        background-color: var(--primaryColor);
        color: #fff;
        width: 45%;
        height: 2.3rem;
        border-radius: 13px;
        cursor: pointer;
    }
`;