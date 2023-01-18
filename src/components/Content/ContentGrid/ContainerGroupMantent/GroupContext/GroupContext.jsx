import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  setOpenModalGroupCreated,
  setCloseMenuContextMantentGroup,
} from "../../../../../redux/states/ActionCore";
import { orderGroupByAscCore } from "../../../../../redux/states/Group";
import GroupCreated from "../../ContainerGroup/ModalesGroup/GroupCreated";


const GroupContext = ({ x, y }) => {
  const dispatch = useDispatch();

  const AbrirModalSaveGroup = () => {
    dispatch(setOpenModalGroupCreated(true));
  }

  const OrdenarGroupCore = () => {
    dispatch(orderGroupByAscCore());
    dispatch(setCloseMenuContextMantentGroup(false));
  }

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

  return (
    <div style={style()}>
        <div onClick={() => AbrirModalSaveGroup()}
        style={{ ...styles.div, ...styles.margin }}
        >
            Crear Grupo
        </div>
        <GroupCreated />
        <Line />
        <div style={styles.div} onClick={() => OrdenarGroupCore()}>
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

export default GroupContext;

const Line = styled.div`
  width: 100%;
  background: #f68a20;
  height: 1px;
`;
