import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  setOpenModalChildCreated,
  setCloseContextChild,
} from "../../../../../redux/states/ActionCore";
import { setOpenModalMetadataCreated } from "../../../../../redux/states/ActionDocumentary"
import { getTypeFileByFolderNew } from "../../../../../redux/states/FileType";
import { orderFolderByDesCore } from "../../../../../redux/states/Folder";
import ChildCreated from "../modalesChild/ChildCreated";
import MetadataCreated from "../../ContainerDocFile/ModalesDocument/MetadataCreated";

const ChildContext = ({ x, y, cabinetId, viewMode }) => {
  const dispatch = useDispatch();
  const { userSesion, folderCore } = useSelector((store) => store);
  const { folderByFolder } = folderCore;
  const { OptionsTocken } = userSesion;
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    OptionsTocken.map((n, i) => {
      if (n.id == "d7b94891-28e4-40e9-9c6a-1878435612ec") {
        setIsTrue(true);
      }
    });
  }, []);

  const AbrirModalCreateChild = (index) => {
    dispatch(getTypeFileByFolderNew(index));
    dispatch(setOpenModalChildCreated(true));
  };

  const OpenSortingChild = () => {
    dispatch(orderFolderByDesCore());
    dispatch(setCloseContextChild(false));
  };

  const OpenModalDocumentCreated = () => {
    dispatch(setOpenModalMetadataCreated(true));
  };

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
    <>
      {viewMode == true && (
        <div style={style()}>
          <div
            onClick={() => AbrirModalCreateChild(cabinetId)}
            style={{ ...styles.div, ...styles.margin }}
          >
            Crear Carpeta
          </div>
          <ChildCreated />
          {isTrue && folderByFolder.length === 0 ? (
            <>
              <Line />
              <div
                onClick={() => OpenModalDocumentCreated()}
                style={{ ...styles.div, ...styles.margin }}
              >
                Crear Documento
              </div>
              <MetadataCreated />
            </>
          ) : (
            <></>
          )}
          <Line />
          <div style={styles.div} onClick={() => OpenSortingChild()}>
            Ordenar
          </div>
          <Line />
          <div style={{ ...styles.div }}>Filtrar</div>
        </div>
      )}

      {viewMode == false && (
        <div style={style()}>
          <div
            onClick={() => AbrirModalCreateChild(cabinetId)}
            style={{ ...styles.div, ...styles.margin }}
          >
            Crear Carpeta
          </div>
          <ChildCreated />
          <Line />
          <div style={styles.div} onClick={() => OpenSortingChild()}>
            Ordenar
          </div>
          <Line />
          <div style={{ ...styles.div }}>Filtrar</div>
          <Line />
          <div style={styles.div}>Detalles</div>
        </div>
      )}
    </>
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

export default ChildContext;

const Line = styled.div`
  width: 100%;
  background: #f68a20;
  height: 1px;
`;
