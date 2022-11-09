import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  setOpenModalCabinetCreated,
  setOpenModalGroupCreated,
  setCloseMenuContextGroup,
} from "../../../../../redux/states/ActionCore";
import { orderCabinetByAscCore } from "../../../../../redux/states/Cabinet";
import GroupCreated from "../../ContainerGroup/ModalesGroup/GroupCreated";
import CabinetCreated from "../ModalesCabinet/CabinetCreated";

const CabinetContext = ({ x, y }) => {
  const dispatch = useDispatch();

  const style = () => {
    return {
      height: 170,
      width: 140,
      zIndex: 1,
      borderRadius: 10,
      backgroundColor: "#fffbf8",
      boxShadow: "0 0 1.5px 1px #F68A20",
      color: "#FCD2D1",
      display: "flex",
      flexDirection: "column",
      padding: 8,
      top: y,
      left: x,
      position: "absolute",
    };
  };

  const AbrirModalGuardarCabinet = () => {
    dispatch(setOpenModalCabinetCreated(true));
  };

  const AbrirModalGuardarGroup = () => {
    dispatch(setOpenModalGroupCreated(true));
  };

  const OrderCabinetCore = () => {
    dispatch(orderCabinetByAscCore());
    dispatch(setCloseMenuContextGroup(false));
  };

  return (
    <div style={style()}>
      <div
        onClick={() => AbrirModalGuardarGroup()}
        style={{ ...styles.div, ...styles.margin }}
      >
        Crear Grupo
      </div>
      <GroupCreated />
      <Line />
      <div
        onClick={() => AbrirModalGuardarCabinet()}
        style={{ ...styles.div, ...styles.margin }}
      >
        Crear gabinete
      </div>
      <CabinetCreated />
      <Line />
      <div style={styles.div} onClick={() => OrderCabinetCore()}>
        Ordenar
      </div>
      <Line />
      <div style={styles.div}>Detalles</div>
    </div>
  );
};

const styles = {
  div: {
    flex: 1,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffbf8",
    color: "#F68A20",
    fontWeight: "bold",
    cursor: "pointer",
  },
  margin: {
    margin: "5px 0",
  },
};

export default CabinetContext;

const Line = styled.div`
  width: 100%;
  background: #f68a20;
  height: 1px;
`;
