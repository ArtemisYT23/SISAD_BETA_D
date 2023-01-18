import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import { setOpenModalMetadataUpdate } from "../../../../../../redux/states/ActionDocumentary";
import { updateMetaDocument } from "../../../../../../redux/states/Document";
import { setClearMetadataSelected } from "../../../../../../redux/states/Metadata";
import ItemUpdateMeta from "./ItemUpdateMeta/ItemUpdateMeta";

const useStyless = makeStyles((theme) => ({
  MetadataUpdate: {
    position: "absolute",
    width: "400px",
    height: "550px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "13px",
    overflowY: "scroll",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    }

  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const UpdateMetadata = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalDocumentary, indexCore, metaCore, documentary, cabinetCore } =
    useSelector((store) => store);
  const { SelectedCabinet } = cabinetCore;
  const { MetadataUpdate } = modalDocumentary;
  const { IndexConfig } = indexCore;
  const { metaDocument } = metaCore;
  const { SelectedDocument } = documentary;
  const [dataIndex, setDataIndex] = useState([]);

  useEffect(() => {
    let NewMetaIndex = [];
    metaDocument.forEach((meta, i) => {
      IndexConfig.forEach((index, i) => {
        if (meta.indexId == index.id) {
          const data = {
            id: meta.id,
            value: meta.value,
            documentId: meta.documentId,
            indexId: meta.indexId,
            name: index.name,
            dataTypeId: index.dataTypeId,
            listId: index.listId,
          };
          NewMetaIndex = [...NewMetaIndex, data];
        }
      });
    });
    setDataIndex(NewMetaIndex);
    // console.log(NewMetaIndex);
  }, [metaDocument]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateMetaDocument(
        metaDocument,
        SelectedDocument?.id,
        SelectedCabinet?.id
      )
    );
    OpenModalUpdateMetadata();
  };

  const HeaderUpdateMetadata = (
    <div className={styless.MetadataUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Actualizar Perfil Metadata</TitleModal>
        </div>
        {dataIndex?.map((item) => (
          <ItemUpdateMeta
            id={item.id}
            name={item.name}
            indexId={item.indexId}
            dataTypeId={item.dataTypeId}
            listId={item.listId}
            value={item.value}
          />
        ))}
        <br />
        <br />
        <div align="right">
          <SaveButton>Crear</SaveButton>
          <CancelButton onClick={() => OpenModalUpdateMetadata()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalUpdateMetadata = () => {
    dispatch(setOpenModalMetadataUpdate(false));
    dispatch(setClearMetadataSelected());
  };

  return (
    <div className={styless.container}>
      <Modal open={MetadataUpdate} onClose={OpenModalUpdateMetadata}>
        {HeaderUpdateMetadata}
      </Modal>
    </div>
  );
};

export default UpdateMetadata;
