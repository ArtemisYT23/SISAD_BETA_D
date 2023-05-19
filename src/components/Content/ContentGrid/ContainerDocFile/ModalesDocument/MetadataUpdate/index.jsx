import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../../Styles/ModalesStyles/modalStyle";
import { setOpenModalMetadataUpdate } from "../../../../../../redux/states/ActionDocumentary";
import { updateMetaDocument } from "../../../../../../redux/states/Document";
import {
  setClearMetadataSelected,
  setMetadataUpdateForValue,
} from "../../../../../../redux/states/Metadata";
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

const UpdateMetadata = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalDocumentary, indexCore, metaCore, documentary, cabinetCore } =
    useSelector((store) => store);
  const { SelectedCabinet } = cabinetCore;
  const { MetadataUpdate } = modalDocumentary;
  const { IndexConfig } = indexCore;
  const { metaDocument, DocumentMetadataUpdate } = metaCore;
  const { SelectedDocument } = documentary;

  useEffect(() => {
    const IndexMeta = [];
    const IndexSort = IndexConfig.sort((a, b) => {
      if (a.position < b.position) {
        return -1;
      }
    });

    IndexSort.map((index, i) => {
      const meta = {
        id: uuidv4(),
        value: null,
        indexId: index?.id,
        name: index.name,
        dataTypeId: index.dataTypeId,
        listId: index.listId,
        maxValue: index.maxValue,
      };
      IndexMeta.push(meta);
    });
   
    IndexMeta.map((index) => {
      metaDocument?.map((meta, i) => {
        if (meta.indexId == index.indexId) {
          index.id = meta.id;
          index.value = meta.value;

          return index;
        }
      });
    });
    dispatch(setMetadataUpdateForValue(IndexMeta));
  }, [MetadataUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const documentId = [];
    // metaDocument.map((meta, i) => {
    //   documentId.push(meta.documentId);
    // });
    const MetadataUpdateNew = [];
    DocumentMetadataUpdate.map((docum, i) => {
      const obj = {
        id: docum.id,
        value: docum.value,
        indexId: docum.indexId,
      };
      MetadataUpdateNew.push(obj);
    });

    const dataSubmit = {
      documentId: SelectedDocument?.id,
      metadata: MetadataUpdateNew,
    };

    // console.log(dataSubmit);
    dispatch(
      updateMetaDocument(
        dataSubmit,
        SelectedDocument?.folderId,
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
        {DocumentMetadataUpdate?.map((item) => (
          <ItemUpdateMeta
            id={item.id}
            name={item.name}
            indexId={item.indexId}
            dataTypeId={item.dataTypeId}
            listId={item.listId}
            value={item.value}
            maxValue={item.maxValue}
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
