import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalMetadataCreated } from "../../../../../../redux/states/ActionDocumentary";
import {
  setChangeMetadataCreatedPreview,
  setClearMetadataCreatedPreview,
} from "../../../../../../redux/states/Metadata";
import {
  CreateDocumentNew,
  setSelectedFolderDocumentNew,
  cleanerDocumentCreated,
} from "../../../../../../redux/states/Document";
import ItemMetadata from "./ItemMetadata";

const useStyless = makeStyles((theme) => ({
  MetadataCreated: {
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
    overflowY: "scroll",
    borderRadius: "13px",
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

const MetadataCreated = () => {
  const styless = useStyless();
  const dispatch = useDispatch();
  const {
    modalDocumentary,
    indexCore,
    documentary,
    metaCore,
    folderCore,
    cabinetCore,
    viewCore,
  } = useSelector((store) => store);
  const { MetadataPreviewCreated } = metaCore;
  const { MetadataCreated } = modalDocumentary;
  const { IndexConfig } = indexCore;
  const { id, folderId } = documentary;
  const { SelectedCabinet } = cabinetCore;
  const { SelectedFolder, SelectedFolderMeta } = folderCore;
  const { selectedView } = viewCore;

  useEffect(() => {
    {
      selectedView != "grid"
        ? dispatch(setSelectedFolderDocumentNew(SelectedFolderMeta?.id))
        : dispatch(setSelectedFolderDocumentNew(SelectedFolder?.id));
    }
    if (MetadataCreated != false) {
      const IndexMeta = [];
      IndexConfig.map((index, i) => {
        const meta = {
          id: uuidv4(),
          value: "",
          indexId: index?.id,
          documentId: id,
        };
        IndexMeta.push(meta);
      });
        console.log(IndexMeta);
        console.log(IndexConfig);
      dispatch(setChangeMetadataCreatedPreview(IndexMeta));
    }
  }, [MetadataCreated]);

  const SaveMetaDocumentary = (e) => {
    e.preventDefault();
    const DocumentNew = {
      id: id,
      folderId: folderId,
    };
    console.log(DocumentNew);
    console.log(MetadataPreviewCreated);
    dispatch(
      CreateDocumentNew(
        DocumentNew,
        MetadataPreviewCreated,
        folderId,
        SelectedCabinet?.id
      )
    );
    OpenModalMetadataCreated();
  };

  const metadataNew = (
    <div className={styless.MetadataCreated}>
      <form onSubmit={SaveMetaDocumentary}>
        <div align="center">
          <h2 className="titulo-modal">Crear Nueva Metadata</h2>
        </div>

        {IndexConfig?.map((item) => (
          <ItemMetadata
            id={item.id}
            name={item.name}
            dataTypeId={item.dataTypeId}
            listId={item.listId}
          />
        ))}
        <br />
        <div align="right">
          <button className="btn-enviar">Crear</button>
          <button
            className="btn-cancelar"
            onClick={() => OpenModalMetadataCreated()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  const OpenModalMetadataCreated = () => {
    dispatch(setOpenModalMetadataCreated(false));
    dispatch(setClearMetadataCreatedPreview());
    dispatch(cleanerDocumentCreated());
  };

  return (
    <div className={styless.container}>
      <Modal open={MetadataCreated} onClose={OpenModalMetadataCreated}>
        {metadataNew}
      </Modal>
    </div>
  );
};

export default MetadataCreated;
