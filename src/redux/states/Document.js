import axios from "axios";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { DocumentServer } from "../../config/axios";
import { getMetadataByCabinet, setMetadataAllDocument } from "./Metadata";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
    documents: [],
    DocumentFolder: [],
    DocumentDetail: [],
    SelectedDocument: "",
    elementError: "",
    referent: [],
    id: uuidv4(),
    folderId: "",
    photo: null,
}

const GET_ALL_DOCUMENTS_DOCU = "GET_ALL_DOCUMENTS_DOCU";
const GET_ALL_DOCUMENTS_ERROR_DOCU = "GET_ALL_DOCUMENTS_ERROR_DOCU";
const SET_FILTER_DOCUMENTS_DOCU = "SET_FILTER_DOCUMENTS_DOCU";
const SET_SELECTED_DOCUMENT_DOCU = "SET_SELECTED_DOCUMENT_DOCU";
const SET_SELECTED_DOCUMENT_ERROR = "SET_SELECTED_DOCUMENT_ERROR";
const GET_ALL_DETAIL_DOCUMENTS_DOCU = "GET_ALL_DETAIL_DOCUMENTS_DOCU";
const GET_ALL_DETAIL_DOCUMENTS_ERRORS = "GET_ALL_DETAIL_DOCUMENTS_ERRORS";
const SET_FOLDER_DOCUMENT_SELECTED = "SET_FOLDER_DOCUMENT_SELECTED";
const SET_SAVE_REFERENCE_TABLE = "SET_SAVE_REFERENCE_TABLE";
const SET_DOCUMENT_CLEANER_DATA = "SET_DOCUMENT_CLEANER_DATA";
const CLEANER_SELECTED_DOCUMENT = "CLEANER_SELECTED_DOCUMENT";
const CLEAR_DATA_MEMORY_DOCUMENT = "CLEAR_DATA_MEMORY_DOCUMENT";
const SET_DETAILS_BY_DOCUMENT = "SET_DETAILS_BY_DOCUMENT";

export default function DocumentaryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOCUMENTS_DOCU:
        case GET_ALL_DOCUMENTS_ERROR_DOCU:
        case SET_FILTER_DOCUMENTS_DOCU:
        case SET_SELECTED_DOCUMENT_DOCU:
        case SET_SELECTED_DOCUMENT_ERROR:
        case GET_ALL_DETAIL_DOCUMENTS_DOCU:
        case GET_ALL_DETAIL_DOCUMENTS_ERRORS:
        case SET_FOLDER_DOCUMENT_SELECTED:
        case SET_SAVE_REFERENCE_TABLE:
        case SET_DOCUMENT_CLEANER_DATA:
        case CLEANER_SELECTED_DOCUMENT:
        case CLEAR_DATA_MEMORY_DOCUMENT:
        case SET_DETAILS_BY_DOCUMENT:
            return action.payload;
        default:
            return state;
    }
};

//Traer todos los documentos
export const getAllDocumentDocu = () => async (dispatch, getState) => {
    const { documentary, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}document`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`,
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_DOCUMENTS_DOCU,
                payload: { ...documentary, documents: response.data },
            });
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_DOCUMENTS_ERROR_DOCU,
            payload: { ...documentary, documents: [] },
        });
    })
};

//filtrar documentos por carpeta
export const setFilterDocumentDocu = FolderId => async (dispatch, getState) => {
    const { documentary } = getState();
    const { documents } = documentary;
    dispatch({
        type: SET_FILTER_DOCUMENTS_DOCU,
        payload: {
            ...documentary, DocumentFolder: documents.filter(documents => documents.folderId == FolderId)
        },
    });
};

//Filtrar documento Seleccionado
export const setSelectedDocumentDocu = (id) => async (dispatch, getState) => {
    const { documentary } = getState();
    const { documents } = documentary;
    const SelectedDocument = documents.find(documents => documents.id == id);

    if (SelectedDocument == undefined) {
        dispatch({
            type: SET_SELECTED_DOCUMENT_ERROR,
            payload: { ...documentary, elementError: "El id no existe" },
        });
        return;
    }
    dispatch({
        type: SET_SELECTED_DOCUMENT_DOCU,
        payload: { ...documentary, SelectedDocument },
    });
};

//Traer detalle de todos los documentos de una carpeta (creacion, actualizacion, archivos)
export const setDetailByFolderDocument = (folderId, value) => async (dispatch, getState) => {
    const { documentary, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}datedocmetacountfile/${folderId}/${value || 0}/20000`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`,
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
            dispatch({
                type: GET_ALL_DETAIL_DOCUMENTS_DOCU,
                payload: { ...documentary, DocumentDetail: response.data },
            });
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_DETAIL_DOCUMENTS_ERRORS,
            payload: { ...documentary, DocumentDetail: [] },
        });
    })
}

//guardar detalle de documentos para una carpeta
export const setDetailsByDocument = (valueData) => async (dispatch, getState) => {
    const { documentary } = getState(); 
    dispatch({
        type: SET_DETAILS_BY_DOCUMENT,
        payload: { ...documentary, DocumentDetail: valueData }
    })
}

//guardar folderId para la creacion de nuevo documento
export const setSelectedFolderDocumentNew = (folderId) => async (dispatch, getState) => {
    const { documentary } = getState();
    dispatch({
        type: SET_FOLDER_DOCUMENT_SELECTED,
        payload: { ...documentary, folderId: folderId }
    })
}

//limpiar referencia referencia de hooks useRef 
export const setSaveReferenceTable = (ref) => async (dispatch, getState) => {
    const { documentary } = getState();
    dispatch({
        type: SET_SAVE_REFERENCE_TABLE,
        payload: { ...documentary, referent: ref }
    })
}

//limpiar estado de creacion de nuevo documento
export const cleanerDocumentCreated = () => async (dispatch, getState) => {
    const { documentary } = getState();
    dispatch({
        type: SET_DOCUMENT_CLEANER_DATA,
        payload: {
            ...documentary,
            id: uuidv4(),
            folderId: ""
        }

    })
}

//Limpiar documento seleccionado
export const cleanerSelectedDocument = () => async (dispatch, getState) => {
    const { documentary } = getState();
    dispatch({
        type: CLEANER_SELECTED_DOCUMENT,
        payload: { ...documentary, SelectedDocument: "" }
    })
}

/*<---------------CRUD DE METADATA Y DOCUMENT----------------> */
//Traer todos los documentos despues de creacion
export const getAllDocumentCreated = (folderId, cabinetId) => async (dispatch, getState) => {
    const { documentary, sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}document`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${TockenUser}`,
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_DOCUMENTS_DOCU,
                payload: { ...documentary, documents: response.data },
            });
            dispatch(setDetailByFolderDocument(folderId));
            dispatch(setFilterDocumentDocu(folderId));
            dispatch(getMetadataByCabinet(cabinetId));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_DOCUMENTS_ERROR_DOCU,
            payload: { ...documentary, documents: [] },
        });
    })
};


//Crear nuevo documento 
export const CreateDocumentNew = (Document, Metadata, folderId, cabinetId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}document`,
        method: "PUT",
        data: Document,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response.data);
        if (response.status == 200) {
            dispatch(getAllDocumentCreated(folderId));
            // dispatch(sendMetaDocument(Metadata, cabinetId));

        }
    }).catch(function (error) {
        console.log(error);
    })
};

//Creacion de nueva metadata 
export const sendMetaDocument = (Metadata, cabinetId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}metadata`,
        method: "PUT",
        data: Metadata,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                dispatch(getMetadataByCabinet(cabinetId));
                dispatch(setMetadataAllDocument());
                toast.success('Metadata Creada');
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Metadata no Creada');
        })
}

//Creacion de metadata y documento
export const CreationMetadataAndDocumentNew = (formFile, folderId, cabinetId) => async (dispatch, getState) => {
    console.log(formFile);
    console.log(folderId);
    console.log(cabinetId);
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}documentmetadata`,
        method: "PUT",
        data: formFile,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                toast.success('Registro Creado Exitosamente');
                dispatch(getAllDocumentCreated(folderId, cabinetId));
                dispatch(setMetadataAllDocument());
            }
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Error Registro No Creado');
        })
}



//Actualizacion de metadata
export const updateMetaDocument = (UpdateMetadata, folderId, cabinetId) => async (dispatch, getState) => {
    // console.log(folderId);
    console.log(cabinetId);
    console.log(UpdateMetadata);
    const { sesion } = getState();
    const { TockenUser } = sesion;
    axios({
        url: `${DocumentServer}updatedocumentmetadata`,
        method: "PUT",
        data: UpdateMetadata,
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        if (response.status == 200) {
            dispatch(getAllDocumentCreated(folderId));
            dispatch(getMetadataByCabinet(cabinetId));
            toast.success('Metadata Actualizada');

        }
    }).catch(function (error) {
        console.log(error);
        toast.error('Metadata no Actualizada');
    })
}

//eliminacion de metadata por codigo de documento
export const deleteMetadataDocument = (documentId, cabinetId) => async (dispatch, getState) => {
    const { sesion } = getState();
    const { TockenUser } = sesion;
    console.log(documentId);
    console.log(cabinetId);
    axios({
        url: `${DocumentServer}metadata/${documentId}`,
        method: "DELETE",
        headers: {
            'Content-Type': "Application/json",
            Authorization: `Bearer ${TockenUser}`
        },
    }).then(function (response) {
        console.log(response.status)
        if (response.status == 200) {
            dispatch(getMetadataByCabinet(cabinetId));
            dispatch(setMetadataAllDocument());
            toast.success('Metadata Eliminada');
        }
    }).catch(function (error) {
        console.log(error.response.data);
        toast.error(error.response.data.error)
    })
}


//limpiar estado de historial de documentos
export const setClearDataMemoryDocument = () => async (dispatch, getState) => {
    const { documentary } = getState();
    dispatch({
        type: CLEAR_DATA_MEMORY_DOCUMENT,
        payload: {
            ...documentary,
            documents: [],
            DocumentFolder: [],
            DocumentDetail: [],
            SelectedDocument: "",
            elementError: "",
            referent: [],
            id: uuidv4(),
            folderId: "",
        }
    })
}

