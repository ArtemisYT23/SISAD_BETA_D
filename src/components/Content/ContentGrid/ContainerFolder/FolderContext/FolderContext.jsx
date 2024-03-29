import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setOpenModalFolderCreated, setCloseContextFolder } from "../../../../../redux/states/ActionCore";
import { getTypeFileByFolderNew } from "../../../../../redux/states/FileType";
import { orderFolderByDesCore } from "../../../../../redux/states/Folder";
import FolderCreated from "../ModalesFolder/FolderCreated";

const FolderMenu = ({ x, y, cabinetId }) => {
  const dispatch = useDispatch();

  const AbrirModalCrearFolder = (index) => {
    dispatch(getTypeFileByFolderNew(index));
    dispatch(setOpenModalFolderCreated(true));
  };

  const OpenSortingFolder = () => {
    dispatch(orderFolderByDesCore());
    dispatch(setCloseContextFolder(false));
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
      <div
        onClick={() => AbrirModalCrearFolder(cabinetId)}
        style={{ ...styles.div, ...styles.margin }}
      >
        Crear Carpetas
      </div>
      <FolderCreated />
      <Line />
      <div style={styles.div} onClick={() => OpenSortingFolder()}>Ordenar</div>
      <Line />
      <div style={{ ...styles.div }}>Filtrar</div>
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

export default FolderMenu;

const Line = styled.div`
  width: 100%;
  background: #f68a20;
  height: 1px;
`;
