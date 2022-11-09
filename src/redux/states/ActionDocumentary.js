const initialState = {
    FileUpload: false,
    FileUpdate: false,
    FileUploadUnit: false,
    FileDelete: false,
    MetadataCreated: false,
    DocumentCreated: false,
    DocumentDelete: false,
    modalPreview: false,
    modalFiles: false,

};

const OPEN_MODAL_UPLOAD_FILE_DOCU = "OPEN_MODAL_UPLOAD_FILE_DOCU";
const OPEN_MODAL_UPDATE_FILE_DOCU = "OPEN_MODAL_UPDATE_FILE_DOCU";
const OPEN_MODAL_UPLOADUNIT_FILE_DOCU =
"OPEN_MODAL_UPLOADUNIT_FILE_DOCU";
const OPEN_MODAL_UPLOADER_FILE_DELETE_DOCU = "OPEN_MODAL_UPLOADER_FILE_DELETE_DOCU";
const OPEN_MODAL_METADATA_CREATED_DOCU = "OPEN_MODAL_METADATA_CREATED_DOCU";
const OPEN_MODAL_CREATED_DOCUMENT_DOCU = "OPEN_MODAL_CREATED_DOCUMENT_DOCU";
const OPEN_MODAL_DELETE_DOCUMENT_DOCU = "OPEN_MODAL_DELETE_DOCUMENT_DOCU";
const SET_OPEN_DETALLE_MODAL_DOCU = "SET_OPEN_DETALLE_MODAL_DOCU";
const SET_OPEN_MODALFILES_METADATA_DOCU = "SET_OPEN_MODALFILES_METADATA_DOCU";

export default function ModalDocumentaryReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_UPLOAD_FILE_DOCU:
        case OPEN_MODAL_UPDATE_FILE_DOCU:
        case OPEN_MODAL_UPLOADUNIT_FILE_DOCU:
        case OPEN_MODAL_UPLOADER_FILE_DELETE_DOCU:
        case OPEN_MODAL_METADATA_CREATED_DOCU:
        case OPEN_MODAL_CREATED_DOCUMENT_DOCU:
        case OPEN_MODAL_DELETE_DOCUMENT_DOCU:
        case SET_OPEN_DETALLE_MODAL_DOCU:
        case SET_OPEN_MODALFILES_METADATA_DOCU:
            return action.payload;
        default:
            return state;
    }
};

/*<-------------------Files-------------------->*/
//Modal subir Archivo Nuevo
export const setOpenModalUploadFile = (bool) => async(dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_UPLOAD_FILE_DOCU,
        payload: { ...modalDocumentary, FileUpload: bool }
    });
};

//Modal Actualiza un file 
export const setOpenModalUploadUpdateFile = (bool) => async(dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_UPDATE_FILE_DOCU,
        payload: { ...modalDocumentary, FileUpdate: bool }
    })
}

//Modal subir archivo uno a uno
export const setOpenModalUploaderUnirFile = (bool) => async(dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_UPLOADUNIT_FILE_DOCU,
        payload: { ...modalDocumentary, FileUploadUnit: bool }      
    })
}

//Modal Eliminar Archivo 
export const setOpenModalDeleteFile = (bool) => async(dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_UPLOADER_FILE_DELETE_DOCU,
        payload: { ...modalDocumentary, FileDelete: bool }
    })
}

/*<-------------Documentos--------------->*/

//Modal crear nuevo Documento
export const setOpenModalDocumentCreated = (bool) => async(dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_CREATED_DOCUMENT_DOCU,
        payload: { ...modalDocumentary, DocumentCreated: bool }
    });
};

//Eliminar Documento (alerta solo se puede borrar si el documento esta vacio )
export const setOpenModalDocumentDelete = (bool) => async(dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_DELETE_DOCUMENT_DOCU,
        payload: { ...modalDocumentary, DocumentDelete: bool }
    });
};


/*<-------------------METADATA--------------------->*/
//Modal Crear Nueva Metadata
export const setOpenModalMetadataCreated = (bool) => async(dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: OPEN_MODAL_METADATA_CREATED_DOCU,
        payload: { ...modalDocumentary, MetadataCreated: bool }
    });
};

/*<---------------------Seccion Preview----------------->*/
export const setOpenDetalleModal = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: SET_OPEN_DETALLE_MODAL_DOCU,
        payload: {
            ...modalDocumentary, modalPreview: bool}
    })
};


/*<----------------Modal Files by Metadata----------------->*/
export const setOpenModalFilesMetadata = (bool) => async (dispatch, getState) => {
    const { modalDocumentary } = getState();
    dispatch({
        type: SET_OPEN_MODALFILES_METADATA_DOCU,
        payload: {
            ...modalDocumentary, modalFiles: bool }
    })
};