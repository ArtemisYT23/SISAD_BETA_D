const initialState = {
    FileUpload: false,
    FileUpdate: false,
    FileUploadUnit: false,
    FileDelete: false,
    MetadataCreated: false,
    MetadataUpdate: false,
    MetadataDelete: false,
    DocumentCreated: false,
    DocumentDelete: false,
    modalPreview: false,
    modalFiles: false,
    modalMasive: false,
    modalDownload: false,
};

const OPEN_MODAL_UPLOAD_FILE_DOCU = "OPEN_MODAL_UPLOAD_FILE_DOCU";
const OPEN_MODAL_UPDATE_FILE_DOCU = "OPEN_MODAL_UPDATE_FILE_DOCU";
const OPEN_MODAL_UPLOADUNIT_FILE_DOCU =
    "OPEN_MODAL_UPLOADUNIT_FILE_DOCU";
const OPEN_MODAL_UPLOADER_FILE_DELETE_DOCU = "OPEN_MODAL_UPLOADER_FILE_DELETE_DOCU";
const OPEN_MODAL_METADATA_CREATED_DOCU = "OPEN_MODAL_METADATA_CREATED_DOCU";
const OPEN_MODAL_METADATA_UPDATE_DOCU = "OPEN_MODAL_METADATA_UPDATE_DOCU";
const OPEN_MODAL_METADATA_DELETE_DOCU = "OPEN_MODAL_METADATA_DELETE_DOCU";
const OPEN_MODAL_CREATED_DOCUMENT_DOCU = "OPEN_MODAL_CREATED_DOCUMENT_DOCU";
const OPEN_MODAL_DELETE_DOCUMENT_DOCU = "OPEN_MODAL_DELETE_DOCUMENT_DOCU";
const SET_OPEN_DETALLE_MODAL_DOCU = "SET_OPEN_DETALLE_MODAL_DOCU";
const SET_OPEN_MODALFILES_METADATA_DOCU = "SET_OPEN_MODALFILES_METADATA_DOCU";
const SET_CLEAR_DATA_ACTION_DOCUMENT = "SET_CLEAR_DATA_ACTION_DOCUMENT";
const SET_OPEN_MODAL_MASIVE_UPLOADER = "SET_OPEN_MODAL_MASIVE_UPLOADER";
const SET_OPEN_MODAL_DOWNLOAD_MASIVE = "SET_OPEN_MODAL_DOWNLOAD_MASIVE";

export default function ModalDocumentaryReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_UPLOAD_FILE_DOCU:
        case OPEN_MODAL_UPDATE_FILE_DOCU:
        case OPEN_MODAL_UPLOADUNIT_FILE_DOCU:
        case OPEN_MODAL_UPLOADER_FILE_DELETE_DOCU:
        case OPEN_MODAL_METADATA_CREATED_DOCU:
        case OPEN_MODAL_METADATA_UPDATE_DOCU:
        case OPEN_MODAL_METADATA_DELETE_DOCU:
        case OPEN_MODAL_CREATED_DOCUMENT_DOCU:
        case OPEN_MODAL_DELETE_DOCUMENT_DOCU:
        case SET_OPEN_DETALLE_MODAL_DOCU:
        case SET_OPEN_MODALFILES_METADATA_DOCU:
        case SET_CLEAR_DATA_ACTION_DOCUMENT:
        case SET_OPEN_MODAL_MASIVE_UPLOADER:
        case SET_OPEN_MODAL_DOWNLOAD_MASIVE:
            return action.payload;
        default:
            return state;
    }
};

/*<-------------------Files-------------------->*/
//Modal subir Archivo Nuevo
export const setOpenModalUploadFile = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_UPLOAD_FILE_DOCU,
        payload: { ...modalDocumentary, FileUpload: bool }
    });
};

//Modal Actualiza un file 
export const setOpenModalUploadUpdateFile = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_FILE_DOCU,
        payload: { ...modalDocumentary, FileUpdate: bool }
    })
}

//Modal subir archivo uno a uno
export const setOpenModalUploaderUnirFile = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_UPLOADUNIT_FILE_DOCU,
        payload: { ...modalDocumentary, FileUploadUnit: bool }
    })
}

//Modal Eliminar Archivo 
export const setOpenModalDeleteFile = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_UPLOADER_FILE_DELETE_DOCU,
        payload: { ...modalDocumentary, FileDelete: bool }
    })
}

/*<-------------Documentos--------------->*/

//Modal crear nuevo Documento
export const setOpenModalDocumentCreated = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_CREATED_DOCUMENT_DOCU,
        payload: { ...modalDocumentary, DocumentCreated: bool }
    });
};

//Eliminar Documento (alerta solo se puede borrar si el documento esta vacio )
export const setOpenModalDocumentDelete = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_DELETE_DOCUMENT_DOCU,
        payload: { ...modalDocumentary, DocumentDelete: bool }
    });
};


/*<-------------------METADATA--------------------->*/
//Modal Crear Nueva Metadata
export const setOpenModalMetadataCreated = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_METADATA_CREATED_DOCU,
        payload: { ...modalDocumentary, MetadataCreated: bool }
    });
};

//modal para actualizar la metadata
export const setOpenModalMetadataUpdate = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_METADATA_UPDATE_DOCU,
        payload: { ...modalDocumentary, MetadataUpdate: bool }
    })
}

//modal para eliminacion de la metadata 
export const setOpenModalMetadataDelete = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_METADATA_DELETE_DOCU,
        payload: { ...modalDocumentary, MetadataDelete: bool }
    })
}

/*<---------------------Seccion Preview----------------->*/
export const setOpenDetalleModal = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: SET_OPEN_DETALLE_MODAL_DOCU,
        payload: {
            ...modalDocumentary, modalPreview: bool
        }
    })
};


/*<----------------Modal Files by Metadata----------------->*/
export const setOpenModalFilesMetadata = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: SET_OPEN_MODALFILES_METADATA_DOCU,
        payload: {
            ...modalDocumentary, modalFiles: bool
        }
    })
};


/*<--------------------Modal para subida masiva------------> */
export const setOpenModalMasiveUploader = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: SET_OPEN_MODAL_MASIVE_UPLOADER,
        payload: { ...modalDocumentary, modalMasive: bool }
    })
}

/*<-----------Modal para Descarga masiva----------------->*/
export const setOpenModalDownloadMasive = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: SET_OPEN_MODAL_DOWNLOAD_MASIVE,
        payload: { ...modalDocumentary, modalDownload: bool }
    })
}


//limpiar datos para cierre de sesion
export const setClearDataActiveDocumentary = () => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: SET_CLEAR_DATA_ACTION_DOCUMENT,
        payload: {
            ...modalDocumentary,
            FileUpload: false,
            FileUpdate: false,
            FileUploadUnit: false,
            FileDelete: false,
            MetadataCreated: false,
            DocumentCreated: false,
            DocumentDelete: false,
            modalPreview: false,
            modalFiles: false,
            modalMasive: false,
        }
    })
}